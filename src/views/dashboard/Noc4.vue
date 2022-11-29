<template>
  <div class="col-start-2 col-span-6 mt-10">
    <div class="grid grid-cols-3 gap-4">
      <div
          v-for="stream in organizationStore.getStreams"
          :key="stream.id"
          class="outline outline-2 outline-offset-1 outline-emerald-400 w-full bg-zinc-700"
      >
        <mux-player
            stream-type="live"
            :playback-id="stream.playback_ids[0].id"
            :metadata-video-title="stream.name"
            metadata-viewer-user-id="Administrator"
            primary-color="#34D399"
            muted="true"
            default-hidden-captions
            class="w-full"
        ></mux-player>
        <div class="m-2 pb-2">
          <h1>{{ stream.name ?? "N/A" }}</h1>
        </div>
        <div class="grid grid-cols-3 m-2 pb-2">
          <div class="flex items-center align-content-center justify-center">
            <button @click="copy(stream)" class="rounded-lg px-3 py-1 bg-zinc-600 text-white text-sm font-bold transition ease-in-out delay-100 duration-200 hover:scale-105">Embed Player</button>
          </div>
          <div class="flex items-center align-content-center justify-center">
            <button @click="markComplete(stream)" class="rounded-lg px-3 py-1 bg-zinc-600 text-white text-sm font-bold transition ease-in-out delay-100 duration-200 hover:scale-105">Mark Complete</button>
          </div>
          <div class="flex items-center align-content-center justify-center">
            <button class="hover:outline outline-offset-2 outline-red-500 rounded-lg px-3 py-1 bg-zinc-600 text-white text-sm font-bold transition duration-200 hover:scale-105">Emergency Stop</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEllipsisVertical);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
import {notify} from "@kyvg/vue3-notification";
const organizationStore = useOrganizationStore();

// TODO - User ID
function copy(stream) {
	const text = `
    <mux-player
        stream-type="live"
        playback-id="${stream.playback_ids[0].id}"
        metadata-video-title="${stream.name}"
        metadata-viewer-user-id="test"
    ></mux-player>`;
	navigator.clipboard.writeText(text);
	notify({
		type: 'success',
		title: `Copied to clipboard`,
	});
}

function markComplete(stream) {
	organizationStore.completeStream(stream.id);
}
</script>