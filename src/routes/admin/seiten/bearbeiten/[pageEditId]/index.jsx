import { ChevronLeftIcon, HomeIcon, PlusIcon } from "qwik-feather-icons";

import { routeLoader$ } from "@builder.io/qwik-city";

import { $, component$, useSignal, useStore } from "@builder.io/qwik";

import ComponentModal from "~/components/cms/ComponentModal";
import { getConfigLoader } from "~/routes/layout";
import TestRender from "~/Theme/TestRender";
import ComponentRenderer from "~/Theme/ComponentRenderer";

export const getPageLoader = routeLoader$(async () => {
  return {
    Title: "Pagetitle",
    URL: "/title",
    Meta: [],
    VisibleInNav: false,
    Components: [
      {
        name: "Leistungsseite",
        display_name: "Leistungsseite",
        image:
          "https://oxrwnfzebsivkjjpljmx.supabase.co/storage/v1/object/public/ambitivecms/ambitive/CMS-Preview/Leistungsseite-Preview.png?t=2023-02-22T10%3A42%3A16.924Z",

        component_id: "a9b4e6d8-8e36-428e-aba3-3eddf2d5ea2a",
      },
      {
        name: "Leistungsseite",
        display_name: "Leistungsseite",
        image:
          "https://oxrwnfzebsivkjjpljmx.supabase.co/storage/v1/object/public/ambitivecms/ambitive/CMS-Preview/Leistungsseite-Preview.png?t=2023-02-22T10%3A42%3A16.924Z",
        component_id: "6dc6c642-e97f-4370-b796-4585cd8e71d7",
      },
    ],
  };
});

export default component$(() => {
  const getPage = getPageLoader().value;
  const config = getConfigLoader().value;

  const pageD = useStore({ data: getPage }, { deep: true });
  const componentContext = useStore(
    { active: false, compIndex: "" },
    { deep: true }
  );
  const openModal = useSignal(false);
  const publishSiteBuilder$ = $(async () => {});

  const source = useSignal(0);
  const destination = useSignal(0);

  const moveArray$ = $((array, from, to) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
  });

  /* useBrowserVisibleTask$(({ track }) => {
    function handleDragStart(e) {
      source.value = parseInt(this.getAttribute("data-attr-key"));
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.outerHTML);
      this.classList.add("dragElem");
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      this.classList.add("over");
      e.dataTransfer.dropEffect = "move";
      return false;
    }

    function handleDragLeave() {
      this.classList.remove("over");
    }

    async function processReorder() {
      if (source.value < destination.value)
        await moveArray$(
          pageD.data.Components,
          source.value,
          destination.value - 1
        );

      if (source.value > destination.value)
        await moveArray$(
          pageD.data.Components,
          source.value,
          destination.value
        );
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      destination.value = parseInt(this.getAttribute("data-attr-key"));
      processReorder();
      this.classList.remove("over");
      return false;
    }

    function addDnDHandlers(elem) {
      elem.addEventListener("dragstart", handleDragStart, false);
      elem.addEventListener("dragover", handleDragOver, false);
      elem.addEventListener("dragleave", handleDragLeave, false);
      elem.addEventListener("drop", handleDrop, false);
      elem.setAttribute("data-attr-handler-done", true);
    }

    const val = track(() => pageD.data.Components.length);
    if (val) {
      var cols = document.querySelectorAll(
        'li[data-attr-handler-done="false"]'
      );
      [].forEach.call(cols, addDnDHandlers);
    }
  }); */

  return (
    <div id="SitebuilderPage">
      <div id="SiteBuilderPage">
        <ComponentModal
          components={pageD.data.Components}
          openModal={openModal}
          config={config}
        />

        <main class="w-screen flex flex-row font-ginger">
          <div class="w-[350px]"></div>
          <div
            class={`duration-300 h-screen fixed ${
              !componentContext.active ? "left-[-350px]" : "left-0"
            }  top-0 flex flex-col w-[350px] border-r bg-[#f5f5f5] z-10 pb-20`}
          >
            {pageD.data.Components[componentContext.compIndex] && (
              <>
                <div class="bg-white p-5 flex items-center flex-row justify-between">
                  <p class="font-bold text-[1.2rem] ">
                    Inhalte -{" "}
                    {
                      pageD.data.Components[componentContext.compIndex]
                        .display_name
                    }
                  </p>
                  <span
                    onClick$={() => {
                      componentContext.active = false;
                      componentContext.compIndex = "";
                    }}
                  >
                    <ChevronLeftIcon class="text-[2rem] text-lightGrayCMS cursor-pointer hover:text-lightBlueCMS duration-300" />
                  </span>
                </div>
              </>
            )}
          </div>
          <div class="h-screen fixed left-0 top-0 md:flex flex-col w-[350px] border-r bg-[#f5f5f5] overflow-scroll pb-20">
            <div class="bg-white p-5 relative">
              <p class="font-bold text-[1.2rem] ">
                Inhalte - {pageD.data.Title}
              </p>
              <a href="/admin/seiten">
                <span class={"absolute right-5 top-6 cursor-pointer"}>
                  <HomeIcon class="text-lightBlueCMS" />
                </span>
              </a>
            </div>
            {/* DRAG & DROP */}
            <div class="p-5">
              <p class="mb-3">Komponenten:</p>
              <>
                <ul id="columns" class={"dragList"}>
                  {pageD.data.Components.map((item, key) => (
                    <li
                      class="column"
                      draggable="true"
                      data-attr-uuid={item.component_id}
                      data-attr-key={key}
                      data-attr-handler-done="false"
                    >
                      <header class="hover:border-violet-500 flex flex-row justify-between border-2 relative border-lightBlueCMS hover:text-lightBlueCMS text-left rounded-md w-full p-2 my-1  duration-300 text-lightBlueCMS">
                        <p>{item.display_name}</p>
                      </header>
                    </li>
                  ))}
                </ul>
                ^You can drag and drop these items^
                <div
                  class="relative border-[3px] flex justify-center py-1 hover:scale-[1.01] mb-2 mt-2 hover:border-lightBlueCMS hover:text-lightBlueCMS text-center border-dashed border-midGrayCMS rounded-md w-full cursor-pointer hover:opacity-75 duration-300 text-midGrayCMS"
                  onClick$={() => (openModal.value = true)}
                >
                  <PlusIcon class="inline relative top-[-1px]  ml-2 text-[1rem]" />
                </div>
                <p class="text-center mt-5"></p>
              </>
            </div>
            <div
              class="shadow-xl absolute bottom-0 whitespace-nowrap flex flex-row justify-between w-full bg-white 
              [&>*]:px-2 [&>button]:w-1/2 [&>*]:py-3 [&>*]:bg-lightBlueCMS [&>*]:text-white [&>*]:rounded-md [&>*]:scale-100 [&>*]:origin-left p-5 gap-x-2 text-white"
            >
              <button
                class="hover:bg-darkBlueCMS duration-300 opacity-0"
                onClick$={() => publishSiteBuilder$()}
              >
                Veröffentlichen
              </button>
            </div>
          </div>
          {/* COMPONENT RENDERING */}
          <div
            class="h-screen relative"
            style={{ width: "calc(100% - 350px)" }}
          >
            <div
              class="fixed pointer-events-none z-0 top-0 right-0 h-screen darkGradient--desktop"
              style={{ width: "calc(100% - 350px)" }}
            ></div>
            <p class={"text-center text-[1.5rem] underline mt-5 text-red-500"}>
              Please have a look into the console.log() too. <br /> Everything
              is triggered the right way
            </p>
            <p class="text-[3rem] text-center my-20">
              Renderer inside index.jsx file (works fine)
            </p>
            <div class="mx-auto w-max">
              {pageD.data.Components.map((list, key) => (
                <li key={key}>{list.name}</li>
              ))}
            </div>
            <p class="text-[3rem] text-center my-20">
              Test Renderer - Renderer which is handled via child component (not
              working)
            </p>
            <div class="mx-auto w-max">
              <TestRender components={pageD.data.Components} />
              <ComponentRenderer components={pageD.data.Components} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

export const head = () => {
  return {
    title: "Seitenbuilder | Ambitive CMS",
    meta: [
      {
        name: "description",
        content:
          "Seitenbuilder des CMS (Content Management System) der Ambitive Digitalagentur",
      },
    ],
  };
};
