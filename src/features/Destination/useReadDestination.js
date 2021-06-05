import { useCallback, useState } from "react";

export default function useReadDestination(content) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);

  const handleCoverIndexSelect = useCallback(
    (index) => {
      setSelectedCoverIndex(index);
    },
    [setSelectedCoverIndex]
  );

  const renderContent = useCallback(() => {
    if (selectedTab === 0) {
      return content?.trek_details;
    }
    if (selectedTab === 1) {
      return content?.itinerary;
    }
    if (selectedTab === 2) {
      return content?.sight_seeing;
    }
    if (selectedTab === 3) {
      return content?.trek_cost;
    }
    return null;
  }, [selectedTab, content]);

  const handleTabSelect = useCallback(
    (index) => {
      setSelectedTab(index);
    },
    [setSelectedTab]
  );

  return {
    selectedTab,
    handleTabSelect,
    renderContent,
    selectedCoverIndex,
    handleCoverIndexSelect,
  };
}
