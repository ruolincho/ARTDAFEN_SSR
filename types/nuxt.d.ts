import type {HttpClient} from "~/api/interface";
import type {MittEvents} from "~/plugins/mitt.client";
import type { Emitter } from 'mitt'
import { AuthGoogle } from '~/plugins/google-auth.client'
import { Encrypt } from '~/plugins/encrypt.client'

declare module '#app' {
    interface NuxtApp {
        $http: HttpClient
        $bus: Emitter<MittEvents>
        $google: AuthGoogle
        $encrypt: Encrypt
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: HttpClient
        $bus: Emitter<MittEvents>
        $google: AuthGoogle
        $encrypt: Encrypt
    }
}

export {}
