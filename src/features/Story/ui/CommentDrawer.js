import { Avatar, Comment, Drawer, message, Spin } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import KSpinner from "../../../core/components/KSpinner";
import decodeApiMessage from "../../../core/helpers/decodeApiMessage";
import useMediaQuery from "../../../core/hooks/useMediaQuery";
import { onAddComment, onAddReply } from "../../../services/comment.service";

export default function CommentDrawer({
  visible,
  onClose,
  comments,
  story_id,
  addNewComment,
  commentCount,
  addNewReply,
}) {
  const isMobile = useMediaQuery(767);
  const commentRef = React.useRef(null);
  const [commentLoading, setCommentLoading] = React.useState(false);

  const onComment = React.useCallback(async () => {
    const comment = commentRef.current.value;
    setCommentLoading(true);
    try {
      const res = await onAddComment({ comment, story: story_id });
      addNewComment({ comment, identifier: res?.identifier });
      message.success(res?.message);
      setCommentLoading(false);
      commentRef.current.value = "";
    } catch (err) {
      message.error(decodeApiMessage(err));
      setCommentLoading(false);
    }
  }, [setCommentLoading, story_id]);

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      placement={isMobile ? "bottom" : "right"}
      width="400px"
      height="90vh"
    >
      <CommentDrawerContentWrapper>
        <h1 className="title"> {commentCount || 0} Comments</h1>

        <div className="comment-write">
          <KSpinner spinning={commentLoading}>
            <textarea
              ref={commentRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onComment();
                }
              }}
              placeholder="Write comment here"
              className="comment-input"
            />
          </KSpinner>
        </div>

        <div className="comments-wrapper">
          {comments?.map((el) => (
            <CommentItem
              key={el?._id}
              _id={el?._id}
              author_name={el?.comment_by?.full_name}
              author_image={el?.comment_by?.display_image}
              created_at={el?.created_at}
              comment={el?.comment}
              replies={el?.replies}
              addNewReply={addNewReply}
            />
          ))}
        </div>
      </CommentDrawerContentWrapper>
    </Drawer>
  );
}

const CommentItem = ({
  _id,
  author_name,
  author_image,
  comment,
  replies,
  created_at,
  addNewReply,
}) => {
  const [showReply, setShowReply] = React.useState(false);
  const replyRef = React.useRef(null);

  const [replyLoading, setReplyLoading] = React.useState(false);

  const onReply = async () => {
    const reply = replyRef.current.value;
    setReplyLoading(true);
    try {
      const res = await onAddReply({ comment: _id, reply: reply });
      message.success(res?.message);
      addNewReply({ comment_id: _id, reply, identifier: res?.identifier });
      replyRef.current.value = "";
      setReplyLoading(false);
    } catch (err) {
      message.error(decodeApiMessage(err));
      setReplyLoading(false);
    }
  };

  return (
    <Comment
      actions={[
        <span
          onClick={() => setShowReply((pV) => !pV)}
          className="comment-nested-reply-to"
        >
          {replies?.length} Reply
        </span>,
        <span className="comment-date">
          {moment(created_at).format("Do MMM, hh:mm A")}
        </span>,
      ]}
      author={<p className="comment-author">{author_name}</p>}
      avatar={<Avatar src={author_image} alt={author_name} />}
      content={<p className="comment-description">{comment}</p>}
    >
      {showReply && (
        <>
          <div className="comment-write">
            <KSpinner spinning={replyLoading}>
              <textarea
                ref={replyRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onReply();
                  }
                }}
                placeholder="Write reply here"
                className="comment-input reply"
              />
            </KSpinner>
          </div>
          {replies?.map((el) => (
            <ReplyItem
              key={el?.id}
              author_image={el?.reply_by?.display_image}
              author_name={el?.reply_by?.full_name}
              created_at={el?.created_at}
              reply={el?.reply}
            />
          ))}
        </>
      )}
    </Comment>
  );
};

const ReplyItem = ({ author_name, author_image, reply, created_at }) => {
  return (
    <Comment
      actions={[
        <span className="comment-date">
          {moment(created_at).format("Do MMM, hh:mm A")}
        </span>,
      ]}
      author={<p className="comment-author">{author_name}</p>}
      avatar={<Avatar src={author_image} alt="Han Solo" />}
      content={<p className="comment-description">{reply}</p>}
    ></Comment>
  );
};

const CommentDrawerContentWrapper = styled.div`
  .title {
    font-size: 16px;
    margin: 8px 0;
  }

  .comment-input {
    border: 0.5px solid #ddd;
    display: block;
    width: 100%;
    padding: 8px 12px;
    font-size: 11px;
    border-radius: var(--br);
    outline: none;
    transition: var(--tsn);
    height: 50px;
    margin-bottom: 8px;

    &.reply {
      height: 36px;
    }

    &:focus {
      border: 0.5px solid var(--text-black);
    }
  }

  .comments-wrapper {
    .comment-nested-reply-to {
      font-size: 11px;
    }
    .comment-description {
      font-size: 12px;
      /* font-weight: 500; */
      /* color: var(--text-medium); */
    }
    .comment-author {
      font-size: 12px;
    }
    .comment-date {
      display: inline-block;
      font-size: 11px;
      cursor: default;
      &:hover {
        color: var(--text-light);
      }
    }
  }
`;
