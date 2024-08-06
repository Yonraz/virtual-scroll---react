# Virtual Scrolling

Naive attempt at creating virtual scrolling from scratch in react.

**Approach:**

The basic approach is to keep track of the scrollY value. This helps determine the current index and also the offset needed to position the list.
The scroll bar needs to be decoupled from the list itself, so three containers are created.
the first container defines the visible height.

```jsx
    <div
        className="container"
        style={{
          height: LIST_HEIGHT,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        ref={listRef}
    >
```

It will handle the scrolling and show the scrollbar itself.

**Decoupling scrollbar from list:**

The second container simulates the list height, to achieve accurate scaling proportions. if this is not being performed, the scroll will be messed up by the constantly changing offset.

```jsx
    <div
      style={{
        height: items.length * LIST_ITEM_HEIGHT,
        position: "relative",
        width: "100%",
      }}
    >
```

**Positioning the list:**

Offset is calculated by multiplying the `startIndex` (`scrollTop / LIST_ITEM_HEIGHT || 0`) by list item height.
The list itself is positioned using the offset with a calculated paddingTop value (not the best way to acheive this but still) 

```tsx

    <ul
      className="list"
      style={{
        transform: `translateY(${offsetY}px)`,
        paddingTop,
        top: 0,
        left: 0,
      }}
    >
```