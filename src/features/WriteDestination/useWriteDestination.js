import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import decodeApiMessage from "../../core/helpers/decodeApiMessage";
import { onAddDestinations } from "../../services/destination.service";

const init_editor_state = {
  trek_details: false,
  itinerary: false,
  sight_seeing: false,
  trek_cost: false,
};

export default function useWriteDestination() {
  const [content, setContent] = useState({
    name: "Write destination name here",
    thumb_image: "",
    cover_images: [],
    trek_details: "",
    itinerary: "",
    sight_seeing: "",
    trek_cost: "",
  });

  const [componentLoaded, setComponentLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(init_editor_state);
  const [selectedCover, setSelectedCover] = useState(null);
  const [addDestinationLoading, setAddDestinationLoading] = useState(false);

  const handleAddDestination = useCallback(async () => {
    setAddDestinationLoading(true);
    try {
      const res = await onAddDestinations(content);
      message.success(res?.message);
      setAddDestinationLoading(false);
    } catch (err) {
      message.error(decodeApiMessage(err));
      setAddDestinationLoading(false);
    }
  }, [content, setAddDestinationLoading]);

  const handleCoverIndexSelect = useCallback(
    (index) => {
      setSelectedCoverIndex(index);
    },
    [setSelectedCoverIndex]
  );

  const handleCoverUpload = useCallback(
    (path) => {
      setContent((pC) => ({ ...pC, cover_images: [...pC.cover_images, path] }));
    },
    [setContent]
  );

  const handleClickShowEditor = useCallback(() => {
    if (selectedTab === 0) {
      setShowEditor((pC) => ({ ...pC, trek_details: true }));
    }
    if (selectedTab === 1) {
      setShowEditor((pC) => ({ ...pC, itinerary: true }));
    }
    if (selectedTab === 2) {
      setShowEditor((pC) => ({ ...pC, sight_seeing: true }));
    }
    if (selectedTab === 3) {
      setShowEditor((pC) => ({ ...pC, trek_cost: true }));
    }
    if (selectedTab === 4) {
      //@TODO
    }
  }, [setShowEditor, selectedTab]);

  const renderContent = useCallback(() => {
    if (selectedTab === 0) {
      return content.trek_details;
    }
    if (selectedTab === 1) {
      return content.itinerary;
    }
    if (selectedTab === 2) {
      return content.sight_seeing;
    }
    if (selectedTab === 3) {
      return content.trek_cost;
    }
    return null;
  }, [selectedTab, content]);

  const handleTabSelect = useCallback(
    (index) => {
      setSelectedTab(index);
    },
    [setSelectedTab]
  );

  const handleContent = useCallback(
    (key, value) => {
      setContent((pC) => ({ ...pC, [key]: value }));
    },
    [setContent]
  );

  const handleClickCloseEditor = useCallback(() => {
    setShowEditor(init_editor_state);
  }, [setShowEditor]);

  //saving on content change
  useEffect(() => {
    if (componentLoaded) {
      localStorage.setItem("destination_content", JSON.stringify(content));
    } else {
      setComponentLoaded(true);
    }
  }, [content]);

  //loading on view mount
  useEffect(() => {
    const sc = localStorage.getItem("destination_content");
    if (!!sc) {
      setContent(JSON.parse(sc));
    }
  }, []);

  return {
    content,
    handleContent,
    selectedTab,
    handleTabSelect,
    showEditor,
    handleClickCloseEditor,
    handleClickShowEditor,
    renderContent,
    selectedCover,
    setSelectedCover,
    handleCoverUpload,
    selectedCoverIndex,
    handleCoverIndexSelect,
    addDestinationLoading,
    handleAddDestination,
  };
}
