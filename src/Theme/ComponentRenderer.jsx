import { component$, useBrowserVisibleTask$ } from "@builder.io/qwik";

/* IMPORT THEME COMPONENTS HERE */
import Leistungsseite from "./Leistungsseite";
/* IMPORT THEME COMPONENTS HERE */

export default component$(({ components }) => {
  useBrowserVisibleTask$(({ track }) => {
    const val = track(() => components.length);
    if (val) {
      console.log(val);
      console.log(components);
    }
  });
  return components.map((Component, key) => (
    <>
      <section key={key}>
        {Component.name === "Leistungsseite" ? (
          <Leistungsseite data={Component.fields} />
        ) : (
          <>
            <div class="border-4 border-red-300 w-[700px] py-5 mx-auto px-20 border-dashed rounded-md">
              Widget konnte nicht gefunden werde. Bitte kontaktieren Sie Ihren
              Administrator.
            </div>
            <div class={"h-20"}></div>
          </>
        )}
      </section>
    </>
  ));
});
