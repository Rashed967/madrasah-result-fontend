import React, { useRef } from 'react';
import PrintButton from './PrintButton'; // Adjust the import path as necessary

const MyComponent = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <PrintButton contentRef={contentRef} />
      <div ref={contentRef}>
        {/* Your content to print goes here */}
        <h1>This is the content to print</h1>
        <p>Additional content can go here.</p>
      </div>
    </div>
  );
};

export default MyComponent;
