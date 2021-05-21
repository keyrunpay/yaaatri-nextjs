import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import KLoader from "../../core/components/KLoader";
import decodeApiMessage from "../../core/helpers/decodeApiMessage";
import { fixLink } from "../../core/helpers/file_helper";
import useAuthInfo from "../../core/hooks/useAuthInfo";
import useMyStories from "../../core/hooks/useMyStories";
import KStoryItem from "../../core/ui/KStoryItem";
import SubPageHeader from "../../core/ui/SubPageHeader";
import DataTable from "react-data-table-component";
import tableCustomStyles from "../../core/helpers/tableCustomStyles";
import tableColumn from "./story.table";
import { FiGrid, FiList } from "react-icons/fi";

export default function MyStories() {
  const { stories, fetchMyStories } = useMyStories();
  const [displayMode, setDisplayMode] = React.useState("list");
  const router = useRouter();

  const gotoReadStory = (slug) => {
    router.push("/story/" + slug);
  };

  const gotoEditStory = (id) => {
    router.push("/edit_story/" + id);
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/");
    else fetchMyStories();
  }, []);

  return (
    <MyStoryWrapper>
      <SubPageHeader title="Your Stories" orange_line />
      <div className="container">
        <div className="flex story-head jcsb">
          <h1 className="title">All Stories</h1>
          <aside className="display-mode">
            <span onClick={() => setDisplayMode("list")}>
              <FiList
                style={{
                  color:
                    displayMode === "list"
                      ? "var(--text-black)"
                      : "var(--gray900)",
                }}
              />
            </span>
            <span onClick={() => setDisplayMode("grid")}>
              <FiGrid
                style={{
                  color:
                    displayMode === "grid"
                      ? "var(--text-black)"
                      : "var(--gray900)",
                }}
              />
            </span>
          </aside>
        </div>

        {stories.status === "loading" && <KLoader />}
        {stories.status === "error" && (
          <div className="text-red">{decodeApiMessage(stories.data)}</div>
        )}

        {stories.status === "data" && displayMode === "list" && (
          <DataTable
            customStyles={tableCustomStyles}
            className="data-table"
            pagination={true}
            onRowClicked={(row) => gotoReadStory(row?.slug)}
            noHeader
            highlightOnHover
            responsive={true}
            data={stories.data}
            columns={tableColumn(gotoReadStory, gotoEditStory)}
          />
        )}

        {stories.status === "data" && displayMode === "grid" && (
          <div className="story-list">
            {stories?.data?.map((el) => (
              <KStoryItem
                key={el?._id}
                title={el?.title}
                image={fixLink(el?.thumb_image, "4x3.png")}
                user_name={el?.author?.full_name}
                comment_count="227"
              />
            ))}
          </div>
        )}

        <br />
      </div>
    </MyStoryWrapper>
  );
}

const MyStoryWrapper = styled.div`
  .story-head {
    margin-bottom: 12px;

    .display-mode {
      span {
        font-size: 24px;
        cursor: pointer;
        margin-left: 16px;
        padding: 2px;

        &:hover {
          svg {
            color: var(--secondary) !important;
          }
        }
      }
    }
  }
  .story-list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 36px 0;

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
