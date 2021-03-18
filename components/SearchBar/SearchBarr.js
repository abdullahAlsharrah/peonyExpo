import { observer } from "mobx-react";
import React from "react";
import { SearchBar } from "react-native-elements";

const SearchBarr = ({ setQuery, query }) => {
  return (
    <SearchBar
      placeholder="Search by phone number or name..."
      placeholderTextColor="gray"
      onChangeText={(event) => setQuery(event)}
      value={query}
      lightTheme={true}
    />
  );
};

export default observer(SearchBarr);
