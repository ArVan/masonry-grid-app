import { useEffect, useState } from "react";
import { usePhotoStore } from "@/store/usePhotoStore";
import { StyledSearchBox, StyledSearchContainer } from "@/styles/SearchStyles";

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <StyledSearchContainer>
      <StyledSearchBox
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={handleChange}
      />
    </StyledSearchContainer>
  );
};

export default SearchInput;
