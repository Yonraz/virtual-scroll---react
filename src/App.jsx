import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { items } from "./items";
import { debounce } from "./debounce";

const LIST_ITEM_HEIGHT = 50; // height in px
const LIST_HEIGHT = 400; // height in px
const VISIBLE_AMOUNT = Math.floor(LIST_HEIGHT / LIST_ITEM_HEIGHT); 
const BUFFER = 2; // buffer amount to allow smooth scroll


function App() {
  const listRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = debounce((e) => {
    setScrollTop(e.target.scrollTop);
  }, 10);

  useEffect(() => {
    const listElement = listRef.current;
    listElement.addEventListener("scroll", handleScroll);
    return () => {
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / LIST_ITEM_HEIGHT) - BUFFER),
    [scrollTop]
  );
  const offsetY = useMemo(() => startIndex * LIST_ITEM_HEIGHT, [startIndex]);
  const visibleItems = useMemo(
    () => {
      const endIndex = Math.min(
        items.length,
        startIndex + VISIBLE_AMOUNT + BUFFER * 2
      );
      return items.slice(startIndex, endIndex)
    
    },
    [startIndex]
  );

  const paddingTop = (LIST_ITEM_HEIGHT * items.length) / 2.42;

  return (
    <>
      <h1>Virtual Scrolling</h1>
      <div
        className="container"
        style={{
          height: LIST_HEIGHT,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        ref={listRef}
      >
        <div
          style={{
            height: items.length * LIST_ITEM_HEIGHT,
            position: "relative",
            width: "100%",
          }}
        >
          <ul
            className="list"
            style={{
              transform: `translateY(${offsetY}px)`,
              paddingTop,
              top: 0,
              left: 0,
            }}
          >
            {visibleItems.map((item) => (
              <li
                key={item.id}
                style={{ height: LIST_ITEM_HEIGHT, width: "100%" }}
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
