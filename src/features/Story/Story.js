import { message } from "antd";
import React from "react";
import { FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import styled from "styled-components";
import useAuthInfo from "../../core/hooks/useAuthInfo";
import KSpinner from "../../core/components/KSpinner";
import decodeApiMessage from "../../core/helpers/decodeApiMessage";
import { onAddLike } from "../../services/like.service";
import CommentDrawer from "./ui/CommentDrawer";
import CustomizedStory from "./ui/CustomizedStory";
import StoryReader from "./ui/StoryReader";
import AboutAuthor from "./ui/AboutAuthor";

export default function Story({
  _id,
  title,
  body,
  cover_image,
  sub_title,
  read_minute,
  author,
  created_at,
  comments,
  likes,
}) {
  const [showComments, setShowComments] = React.useState(false);
  const [commentCount, setCommentCount] = React.useState(0);

  const [commentArray, setCommentArray] = React.useState(comments);
  const [likeArray, setLikeArray] = React.useState(likes);

  const [likeLoading, setLikeLoading] = React.useState(false);
  const user = useAuthInfo();
  const hasLiked = likeArray?.includes(user?.id);

  const onLike = React.useCallback(async () => {
    setLikeLoading(true);
    try {
      const res = await onAddLike({ story: _id });
      setLikeLoading(false);
      if (res?.remove_like) {
        setLikeArray((pV) => pV?.filter((el) => el !== user?.id));
      } else {
        setLikeArray((pV) => [...pV, user?.id]);
      }
      message.success(res.message);
    } catch (err) {
      setLikeLoading(false);
      message.error(decodeApiMessage(err));
    }
  }, [setLikeLoading, setLikeArray, user, _id]);

  const addNewComment = React.useCallback(
    ({ comment, identifier }) => {
      const comment_by = { full_name: user?.name, display_image: user?.image };
      setCommentArray((pC) => [
        {
          comment,
          _id: identifier,
          comment_by,
          replies: [],
          created_at: new Date().toISOString(),
        },
        ...pC,
      ]);
    },
    [setCommentArray, user]
  );

  const addNewReply = React.useCallback(
    ({ reply, comment_id, identifier }) => {
      const reply_by = { full_name: user?.name, display_image: user?.image };
      setCommentArray((pC) => {
        const modifiedComment = pC.map((el) => {
          if (el._id === comment_id) {
            el.replies = [
              {
                reply_by,
                reply,
                created_at: new Date().toISOString(),
                id: identifier,
              },
              ...el?.replies,
            ];
          }
          return el;
        });
        return modifiedComment;
      });
    },
    [setCommentArray, user]
  );

  React.useEffect(() => {
    setCommentArray(comments);
    setLikeArray(likes);
  }, [_id]);

  React.useEffect(() => {
    let comment_count = commentArray?.length;
    commentArray?.forEach((el) => {
      comment_count += el?.replies?.length || 0;
    });
    setCommentCount(comment_count);
  }, [commentArray]);

  return (
    <StoryWrapper>
      <CommentDrawer
        visible={showComments}
        onClose={() => setShowComments(false)}
        story_id={_id}
        addNewComment={addNewComment}
        addNewReply={addNewReply}
        comments={commentArray}
        commentCount={commentCount}
      />
      <header>
        <h1 className="title">{title}</h1>
        <img src="/blue_line.svg" alt="" />
      </header>
      <CustomizedStory />
      <StoryReader
        title={title}
        sub_title={sub_title}
        cover_image={cover_image}
        author={author}
        created_at={created_at}
        read_minute={read_minute}
      />
      <div className="container story-body">
        <div
          className="ck-content"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        <br />

        <div className="story-comment-like-wrapper">
          <h1 className="comment-like-header">Like & Comments</h1>
          <div className="comment-like-wrap">
            <KSpinner spinning={likeLoading}>
              <div onClick={onLike} className="comment-item flex ci">
                <FiThumbsUp className={hasLiked ? "filled" : ""} />
                <span>{likeArray?.length}</span>
              </div>
            </KSpinner>
            <div
              onClick={() => setShowComments(true)}
              className="comment-item flex ci"
            >
              <FiMessageCircle />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      <AboutAuthor
        author_image={author?.display_image}
        author_name={author?.full_name}
        created_at={author?.created_at}
      />
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  .story-comment-like-wrapper {
    padding: 16px 0;
    .comment-like-header {
      font-size: 18px;
      margin-bottom: 2px;
    }

    .comment-like-wrap {
      display: flex;
      align-items: center;
      .filled {
        fill: var(--primary);
        stroke: var(--primary);
      }
    }

    .comment-item {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-regular);
      margin-right: 8px;
      padding: 8px;
      border-radius: var(--br);
      cursor: pointer;
      transition: var(--tsn);

      span {
        margin-left: 4px;
      }
      svg {
        font-size: 20px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);
        color: var(--text-black);
      }
    }
  }

  .story-body {
    margin-top: 16px;
  }

  header {
    padding: 16px 0;
    text-align: center;

    .title {
      font-size: 32px;

      @media (max-width: 767px) {
        font-size: 24px;
        padding: 0 15px;
      }
    }
  }
`;
