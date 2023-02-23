import { component$, useSignal } from "@builder.io/qwik";
import { XIcon, SearchIcon } from "qwik-feather-icons";

export default component$(({ components, openModal, config }) => {
  const pageSearch = useSignal("");

  return (
    <div
      style={{ backdropFilter: "blur(5px)" }}
      class={`font-ginger fixed flex z-10 justify-center items-center left-0 top-0 duration-300 h-screen w-screen ${
        openModal.value
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div class="flex flex-col relative border px-10 pb-10 max-h-[80vh] overflow-scroll rounded-md bg-white">
        <div class="sticky top-0 py-10 bg-white">
          <div
            class="absolute right-0 top-11 text-[2rem] text-lightGray cursor-pointer hover:rotate-90 duration-300"
            onClick$={() => (openModal.value = false)}
          >
            <XIcon />
          </div>
          <p class="font-bold top-10 mb-10 z-10 text-[1.5rem] bg-white ">
            Komponente auswählen:
          </p>
          <div class="w-max relative">
            <SearchIcon class="text-[1.8rem] absolute right-3 top-1/2 -translate-y-1/2 text-midGray" />
            <input
              value={pageSearch.value}
              onInput$={(e) => (pageSearch.value = e.target.value)}
              placeholder="Komponente suchen"
              class="text-darkBlue w-[1000px] blue-gradient-transparent rounded-md p-4 pl-7  z-10 left-0 top-0"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {config.ConfigId.ComponentStore.map(
            (comp, key) =>
              comp.display_name
                .toLowerCase()
                .includes(pageSearch.value.toLowerCase()) && (
                <div key={key}>
                  <div
                    class="flex flex-col px-4 aspect-video border border-lightGrayCMS rounded-md py-5 cursor-pointer 
                    hover:border-lightBlueCMS duration-300 hover:scale-105 bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: "url(" + comp.image + ")" }}
                    onClick$={() => {
                      let tmpComp = { ...comp };
                      components.push(tmpComp);
                      openModal.value = false;
                    }}
                    key={key}
                  ></div>
                  <p class="mt-3 text-center">{comp.display_name}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
});
