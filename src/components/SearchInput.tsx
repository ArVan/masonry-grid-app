import { useEffect, useState } from "react";
import { usePhotoStore } from "@/store/usePhotoStore";
import { SearchBox, SearchContainer } from "@/styles/SearchStyles";

const SearchInput = () => {
  const { fetchPhotos, setSearchQuery } = usePhotoStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(query);
      fetchPhotos(query, true);
    }, 500); // Wait 500ms before sending the request

    return () => clearTimeout(debounce); // Clear timeout if user keeps typing
  }, [query]);

  return (
    <SearchContainer>
      <SearchBox
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchInput;
