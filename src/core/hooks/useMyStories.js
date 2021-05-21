import React from "react";
import { useDispatch, useSelector } from "react-redux";
import myStorySlice from "../../redux/slice/my_stories.slice";
import { onReadMineStory } from "../../services/story.service";

export default function useMyStories() {
  const stories = useSelector((state) => state.my_stories);
  const dispatch = useDispatch();

  const fetchMyStories = React.useCallback(async () => {
    dispatch(myStorySlice.actions.setLoading());
    try {
      const res = await onReadMineStory();
      dispatch(myStorySlice.actions.setData(res));
    } catch (err) {
      dispatch(myStorySlice.actions.setError(err));
    }
  }, []);

  return { stories, fetchMyStories };
}
