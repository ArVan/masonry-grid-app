import { render, screen } from "@testing-library/react";
import SearchInput from "@/components/SearchInput";
import { vi } from "vitest";

// Mock Zustand store
vi.mock("@/store/usePhotoStore", () => ({
  usePhotoStore: vi.fn(() => ({
    fetchPhotos: vi.fn(),
    setSearchQuery: vi.fn(),
  })),
}));

describe("SearchInput", () => {
  it("renders the input field", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search images...")).toBeInTheDocument();
  });
});
