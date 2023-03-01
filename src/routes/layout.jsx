import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const getConfigLoader = routeLoader$(async () => {
  return {
    WebsiteId: 14,
    ConfigId: {
      WebPageConfigId: 15,
      CompanyId: "cf85f4c4-d84c-47e3-b2d5-0e5675fcaf9f",
      ComponentStore: [
        { display_name: "Test 1", name: "Test 1" },
        { display_name: "Test 2", name: "Test 2" },
      ],
    },
  };
});

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
