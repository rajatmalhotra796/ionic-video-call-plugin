import type { ListenerCallback, PluginListenerHandle } from "@capacitor/core";
import type { ConnectOptions } from "twilio-video";

// import { SyntagiTwilioVideoWeb } from './web';

// const SyntagiVideo: SyntagiTwilioVideoPlugin = new SyntagiTwilioVideoWeb();

export interface SyntagiTwilioVideoPlugin {
    enableVideo(): void;
    disableVideo(): void;
    enableAudio(): void;
    disableAudio(): void;
    removeAllListeners(): void;
    disconnectCall(): Promise<RoomConnectionStatus>;

    participantsSize(): Promise<number>;
    disableLocalVideo(): boolean;
    enableLocalVideo(): boolean;
    disableLocalAudio(): boolean;
    enableLocalAudio(): boolean;
    connectWithRemoteParticipants(): void;
    changeLocalTracksAttachedEL(newMediaEL: HTMLElement): Promise<TracksStatus>;
    accessRoomWithoutJoining(roomData: VideoRoom, prevMediaEL: HTMLElement,
        options: ConnectOptions): Promise<boolean>;
    joinRoom(newMediaEL: HTMLElement): Promise<TracksStatus | null>;
    makeCall(roomData: VideoRoom, localMediaEL: HTMLElement, remoteMediaEL: HTMLElement): Promise<RoomConnectionStatus>;
    addListener(eventName: 'participantJoined', listenerFunc: ListenerCallback): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'participantDisconnected', listenerFunc: ListenerCallback): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface VideoRoom {
    appointmentId: string;
    roomId: string;
    token: string;
    userId: string;
    userRole: number;
    userName: string;
    userImage: string;
    fromUserId: string;
    fromUserRole: number;
    fromUserName: string;
    fromUserImage: string;
    makeCall: boolean;
    connect: boolean;
    to: string;
    To: string;
}

export enum RoomConnectionStatus {
    FAILURE = 0,
    SUCCESS = 1,
    DISCONNECTED = 2,
}

export interface TracksStatus {
    isVideoDisabled: boolean;
    isAudioDisabled: boolean;
}

export type RoomParticipantsSize = number;

export interface SyntagiVideoRoomStats {
    participantsSize: number | undefined;
    participants: any;
}

// export { SyntagiVideo };
