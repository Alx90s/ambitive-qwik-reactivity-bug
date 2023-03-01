import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <Link
        class={
          "text-[2rem] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max font-bold p-4 border rounded-lg"
        }
        href="/admin/seiten/bearbeiten/d600dd11-8b58-4a48-b8dc-d0d1c8943686/"
      >
        Go to [BUG] preview page
      </Link>
    </>
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
