import type {HttpClient} from "~/api/interface";
import type {MittEvents} from "~/plugins/mitt.client";
import type { Emitter } from 'mitt'

declare module '#app' {
    interface NuxtApp {
        $http: HttpClient
        $bus: Emitter<MittEvents>
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: HttpClient
        $bus: Emitter<MittEvents>
    }
}

export {}
