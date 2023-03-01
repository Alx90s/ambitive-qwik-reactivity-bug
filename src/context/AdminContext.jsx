import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { XIcon, SearchIcon } from "qwik-feather-icons";
export const AdminContext = createContextId("AdminContext");
export const AdminContextProvider = component$(() => {
  const router = useLocation();
  if (router.url.pathname.split("/")[1] !== "admin") return <Slot />;
  const admin = useStore(
    {
      loginStatus: false,
      user: {},
      config: {},
      website: {},
      modal: { title: "", description: "", callback: "" },
      album: {
        active: false,
        mediaSearch: "",
        images: [],
        uploaded: [],
        folder: "",
        selectedURL: "",
        selectedField: "",
      },
      toast: [],
      loader: false,
      loaded: true,
      refreshImages: $(() => {}),
    },
    { recursive: true }
  );

  useContextProvider(AdminContext, admin);
  return (
    <>
      {/* <<<----- TOAST ----->>>  */}
      <div class="z-[99] fixed right-0 top-0 flex flex-col items-end font-ginger">
        {admin.toast.map((mess, i) => (
          <div
            key={i}
            class="text-black shadow-lg rounded-md bg-slate-50 p-5 mt-5 mr-5 relative toast-slide w-max"
          >
            <div
              class={`indicator absolute left-0 top-0 h-full w-1 rounded-l-md ${
                mess.status === 404
                  ? "bg-red-600"
                  : mess.status === 200
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            />
            {mess.message}
          </div>
        ))}
      </div>
      {/* <<<----- LOADER ----->>>  */}
      <div
        class={`${
          admin.loader ? "opacity-100" : "opacity-0"
        } w-screen h-screen flex justify-center items-center z-20 fixed top-0 left-0 bg-[#e0e0e09f] pointer-events-none duration-300`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* <<<----- MODAL ----->>>  */}
      <div
        class={`${
          admin.modal.title
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }  w-screen h-screen flex justify-center items-center z-20 fixed top-0 left-0 bg-[#e0e0e09f] font-ginger duration-300`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div class="">
          <p class="text-[4rem]">{admin.modal.title}</p>
          <p class="mt-2">{admin.modal.description}</p>
          <div
            class="flex flex-row items-start justify-start gap-x-5 [&>*]:text-[1.5rem] mt-8 
          "
          >
            <button
              class="px-4 py-3 border border-lightBlueCMS rounded-md"
              onClick$={() => {
                admin.modal.callback = true;
                admin.modal.title = "";
              }}
            >
              Bestätigen
            </button>
            <button
              class="px-4 py-3 bg-lightBlueCMS text-white rounded-md scale-100 origin-left"
              onClick$={() => {
                admin.modal.callback = false;
                admin.modal.title = "";
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
      {/* <<<----- ALBUM ----->>>  */}
      <div
        class={`${
          admin.album.active
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } album-vanilla font-ginger w-screen h-screen flex flex-col pl-[28vw] justify-center items-start z-30 fixed top-0 left-0 bg-[#e0e0e09f]  duration-300`}
        style={{ backdropFilter: "blur(20px)" }}
      >
        <div class="w-[900px] relative">
          <span
            class="hover:scale-105 absolute right-0 text-[2rem]  text-midGrayCMS duration-300 cursor-pointer"
            onClick$={() => {
              admin.album.active = false;
              const album = document.getElementsByClassName("album-vanilla");
              localStorage.setItem("rich-text", true);
              localStorage.setItem("imageURL", "");
              album[0].style.opacity = 0;
              album[0].style.pointerEvents = "none";
            }}
          >
            <XIcon />
          </span>
          <p class="text-[3rem]">Bild auswählen</p>
          <p class="mt-2">
            Wählen Sie ein bereits hochgeladenes Bild aus, oder laden Sie ein
            neues Bild hoch.
          </p>
          <div class="w-full relative mt-5 flex flex-row gap-x-10 justify-between">
            <div class="relative">
              <SearchIcon class="text-[1.8rem] absolute right-3 top-1/2 -translate-y-1/2 text-midGrayCMS" />
              <input
                value={admin.album.mediaSearch}
                onInput$={(e) => (admin.album.mediaSearch = e.target.value)}
                placeholder="Bild suchen"
                class="text-darkBlue w-[700px] blue-gradient-transparent rounded-md p-4 pl-7  z-10 left-0 top-0"
              />
            </div>
            <button
              class="flex-grow text-white px-5 py-4 bg-lightBlueCMS hover:bg-darkBlueCMS duration-300 rounded-md"
              onClick$={() => document.getElementById("albumUpload").click()}
            >
              Hochladen
            </button>
            <input
              class="hidden"
              type="file"
              id={"albumUpload"}
              onChange={(e) => console.log("upload here")}
            />
          </div>
        </div>
        <div
          class="overflow-scroll mt-8"
          style={{ height: "calc(100% - 400px)" }}
        >
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-[900px]">
            {admin.album.images &&
              admin.album.images.map(
                (image, key) =>
                  image.name
                    .toLowerCase()
                    .includes(admin.album.mediaSearch.toLowerCase()) && (
                    <div
                      key={key}
                      class="relative w-full flex flex-col album-cms aspect-square"
                    >
                      <div
                        class="relative top-1/2 -translate-y-1/2 cursor-pointer duration-300"
                        onClick$={() => {
                          if (localStorage.getItem("rich-text") === "true") {
                            let imgURL =
                              "https://oxrwnfzebsivkjjpljmx.supabase.co" +
                              "/storage/v1/object/public/" +
                              import.meta.env.VITE_SUPABASE_STORAGE_NAME +
                              "/" +
                              import.meta.env.VITE_SUPABASE_STORAGE_FOLDER +
                              "/public/" +
                              image.name;
                            localStorage.setItem("imageURL", imgURL);
                            localStorage.setItem("rich-text", false);
                          } else {
                            admin.album.active = false;
                            admin.album.selectedURL =
                              "https://oxrwnfzebsivkjjpljmx.supabase.co" +
                              "/storage/v1/object/public/" +
                              import.meta.env.VITE_SUPABASE_STORAGE_NAME +
                              "/" +
                              import.meta.env.VITE_SUPABASE_STORAGE_FOLDER +
                              "/public/" +
                              image.name;
                          }
                        }}
                        key={key}
                      >
                        <img
                          src={
                            "https://oxrwnfzebsivkjjpljmx.supabase.co" +
                            "/storage/v1/object/public/" +
                            import.meta.env.VITE_SUPABASE_STORAGE_NAME +
                            "/" +
                            import.meta.env.VITE_SUPABASE_STORAGE_FOLDER +
                            "/public/" +
                            image.name
                          }
                          alt={image.name || ""}
                        />
                      </div>
                      <p class="line-clamp-1 text-center mt-2">
                        {image.name || ""}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
      <Slot />
    </>
  );
});
