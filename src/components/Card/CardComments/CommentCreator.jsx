import React from 'react';
import sendSvg from '../../../images/gallery/send.svg';

const CommentCreator = ({ refs, textareaAction, commentSend, isLoading }) => {
  const cursorStyle = !isLoading ? 'not-allowed' : 'pointer';
  return (
    <div className="cc-cr-cont bgHighAlt">
      <div className="cc-cr br15">
        <div className="cc-cr-input-cont" ref={refs.textareaContRef}>
          <textarea
            className="cc-cr-input input-fill fS16"
            placeholder="Write comment here..."
            ref={refs.textareaRef}
            onChange={() => {
              textareaAction();
            }}
          ></textarea>
        </div>
        <div className="cc-cr-act fcj">
          <button
            className="btn-img-core btn-img-fill cc-cr-send"
            onClick={() => {
              commentSend();
            }}
            style={{ cursor: cursorStyle }}
          >
            <img
              src={sendSvg}
              alt="Send"
              data-btn="btn-icon"
              title="Send comment"
            />
          </button>
          <p className="cc-cr-symbols" ref={refs.symbolCountRef}>
            0/250
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCreator;
