import { act } from "react";
import { usePhotoStore } from "../store/usePhotoStore";
import { vi } from "vitest";
import mockPhotos from "./mocks/photos.json";

// Mock Fetch API
global.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ photos: mockPhotos }), {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    }),
  ),
);

describe("usePhotoStore", () => {
  it("fetches photos and updates state", async () => {
    const initialState = usePhotoStore.getInitialState();

    await act(() => initialState.fetchPhotos("nature", true));

    const newState = usePhotoStore.getState();

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.photos).toHaveLength(1);
    expect(JSON.stringify(newState.photos)).toBe(JSON.stringify(mockPhotos));
  });

  it("handles API errors", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(
        new Response(JSON.stringify({ photos: mockPhotos }), {
          status: 400,
          statusText: "Wrong params",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const initialState = usePhotoStore.getInitialState();

    await act(() => initialState.fetchPhotos("nature"));

    const newState = usePhotoStore.getState();

    expect(newState.error).toBe("API Error: 400 Wrong params");
  });

  it("sets search query in state", async () => {
    const initialState = usePhotoStore.getInitialState();

    await act(() => initialState.setSearchQuery("nature"));

    const newState = usePhotoStore.getState();

    expect(newState.searchQuery).toBe("nature");
  });
});
