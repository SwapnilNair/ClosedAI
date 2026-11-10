---
title: "Much ado about nil"
description: "How a Go interface can say it isn’t nil even when it is, and how to avoid getting caught by this nuance of the language."
publishedAt: 2026-11-09
topics: ["Go", "Software Engineering"]
featured: false
draft: false
---

In Go, you can check that a value is non-nil, call a method on it, and still get a nil pointer panic because the interface you checked contains a nil pointer. This is a particularly annoying thing to discover in code you thought you had already guarded, which is how I ended up explaining to my architect that yes, I had written the nil check, and yes, the code was crashing anyway.

The problem was a factory function returning a nil pointer through an interface. A smaller example of the same mistake turns up in config validation, where a successful check can accidentally return a non-nil error.

I [first wrote about this on the Aurva blog](https://aurva.io/blog/the-go-interface-mystery-every-senior-developer-gets-wrong) in June 2025. Coming back to it, I wanted to keep the explanation closer to the thing that actually tripped me up: the moment a perfectly ordinary nil pointer becomes an interface value.

## A validation error without a failure

Suppose a service checks its listening port at startup. It uses a custom error type so callers can identify the invalid field:

```go
type ConfigError struct {
    Field string
}

func (e *ConfigError) Error() string {
    return "invalid config: " + e.Field
}

func validatePort(port int) error {
    var err *ConfigError
    if port < 1 || port > 65535 {
        err = &ConfigError{Field: "port"}
    }
    return err
}
```

For a valid port, nothing assigns to `err`, so it remains nil. Now call it:

```go
err := validatePort(8080)
fmt.Println(err == nil)
fmt.Printf("%T\n", err)
```

```text
false
*main.ConfigError
```

The caller's `if err != nil` branch will run despite the valid port. Calling `err.Error()` directly will panic when it tries to read `e.Field`. There goes the perfectly reasonable nil check.

*The snippets belong to package `main`; the caller uses `fmt`. The definitions stay the same below unless explicitly replaced.*

## What the return carries

Inside `validatePort`, `err` has type `*ConfigError`. The function returns `error`, which is an interface. At `return err`, Go converts that pointer into an interface value carrying both its dynamic type and its value:

```text
return err  →  (type: *ConfigError, value: nil)
return nil  →  (type: none,         value: none)
```

Only the second interface compares equal to nil. In the first, the pointer is nil but its type is still present. The [Go FAQ explains this exact error-return case](https://go.dev/doc/faq#nil_error).

You can isolate the conversion in three lines:

```go
var pointer *ConfigError
var err error = pointer
fmt.Println(pointer == nil, err == nil) // true false
```

The same thing happens when a factory returns a nil `*User` as a user interface, or when a nil pointer is passed into an interface parameter. The [dynamic type survives the assignment](https://go.dev/ref/spec#Variables). Printing `%T` is a useful first check when the value looks nil but the comparison disagrees.

## Return nil on success

For this validator, the fix is small:

```go
func validatePort(port int) error {
    if port < 1 || port > 65535 {
        return &ConfigError{Field: "port"}
    }
    return nil
}
```

Now the two cases behave as the caller expects:

```go
fmt.Println(validatePort(8080) == nil) // true
fmt.Println(validatePort(0))           // invalid config: port
```

I would keep both cases in a test. It is easy to test the invalid input, see the expected error, and miss that every valid input also enters the error-handling branch.

For a factory that gets a pointer from another function, the equivalent fix is to check that pointer before returning it through the interface. If it is nil, return `nil` explicitly. That keeps every caller from having to know which concrete types might be hiding inside the result.

## What about handling nil in the method?

Adding `if e == nil` to `Error()` could make that method safe to call. It would still leave the caller with a non-nil error for a successful validation, so the service might refuse to start anyway. A nil receiver can be useful when an API deliberately defines behaviour for it; here, the return value needs fixing.

Reflection can inspect the pointer too, but [`reflect.Value.IsNil` can itself panic](https://pkg.go.dev/reflect#Value.IsNil) on an invalid value or an unsupported kind. There is no need to add it to this validator.

This is now one of the first things I look for when a nil check behaves strangely: the assignment or return where a concrete pointer became an interface. Usually it is a very ordinary-looking line, which is rather rude considering how much time it can consume.

