import { component$, useBrowserVisibleTask$ } from "@builder.io/qwik";

export default component$(({ components }) => {
  useBrowserVisibleTask$(({ track }) => {
    const val = track(() => components.length);
    if (val) {
      console.log("Im a console.log() from the TestRenderer");
      console.log("Components Lenght:" + val);
      console.log("Components Array:", components);
    }
  });
  return components.map((Component, key) => (
    <>
      <li key={key}>{Component.name}</li>
    </>
  ));
});
