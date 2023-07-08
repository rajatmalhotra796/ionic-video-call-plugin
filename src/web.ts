import { WebPlugin } from '@capacitor/core';
import type {
    LocalAudioTrack, LocalVideoTrack, ConnectOptions, LocalTrack,
    Room, LocalTrackPublication, RemoteAudioTrack, RemoteVideoTrack,
    RemoteParticipant, LocalAudioTrackPublication, LocalVideoTrackPublication,
    RemoteTrackPublication, LocalDataTrack, CreateLocalTracksOptions, RemoteTrack
} from 'twilio-video';
import { TrackPublication, connect, createLocalTracks } from 'twilio-video';

import type { RoomParticipantsSize, SyntagiTwilioVideoPlugin, SyntagiVideoRoomStats, TracksStatus, VideoRoom } from './definitions';
import { RoomConnectionStatus } from './definitions';

export class SyntagiTwilioVideoWeb extends WebPlugin implements SyntagiTwilioVideoPlugin {

    private _localTracks!: LocalTrack[] | null;
    private _localVideoTrack!: LocalVideoTrack;
    private _localAudioTrack!: LocalAudioTrack;

    private _activeRoom!: Room;
    private _roomData!: VideoRoom;
    private _localMediaEL!: HTMLElement;
    private _remoteMediaEL!: HTMLElement;

    private get roomData(): VideoRoom { return this._roomData; }
    private set roomData(roomData: VideoRoom) { this._roomData = roomData; }

    private get activeRoom(): Room { return this._activeRoom; }
    private set activeRoom(room: Room) { this._activeRoom = room; }

    private get localMediaEL(): HTMLElement { return this._localMediaEL; }
    private set localMediaEL(el: HTMLElement) { this._localMediaEL = el; }

    private get remoteMediaEL(): HTMLElement { return this._remoteMediaEL; }
    private set remoteMediaEL(el: HTMLElement) { this._remoteMediaEL = el; }

    private get localTracks(): LocalTrack[] | null { return this._localTracks; }
    private set localTracks(tracks: LocalTrack[] | null) { this._localTracks = tracks; }

    private get localVideoTrack(): LocalVideoTrack { return this._localVideoTrack; }
    private set localVideoTrack(track: LocalVideoTrack) { this._localVideoTrack = track; }

    private get localAudioTrack(): LocalAudioTrack { return this._localAudioTrack; }
    private set localAudioTrack(track: LocalAudioTrack) { this._localAudioTrack = track; }

    constructor() { super(); }

    async disconnectCall(): Promise<RoomConnectionStatus> {
        this.disableLocalAudio(); this.disableLocalVideo();
        this._detachLocalTracksFromELement();
        this.activeRoom.disconnect();
        return RoomConnectionStatus.DISCONNECTED;
    }

    async participantsSize(): Promise<number> { return this.activeRoom.participants.size; }

    private _detachLocalTracksFromELement() {
        // track.detach().forEach((el: HTMLMediaElement) => { el.remove(); })
        const attachedAEL: HTMLMediaElement[] = this.localAudioTrack.detach();
        attachedAEL.forEach((el: HTMLMediaElement) => el.remove());
        const attachedVEL: HTMLMediaElement[] = this.localVideoTrack.detach();
        attachedVEL.forEach((el: HTMLMediaElement) => el.remove());
    }

    private _attachMediaTrack(wrapperEL: HTMLElement, mediaKind: 'video' | 'audio' | 'data',
        isTrackEnabled: boolean, participantName: string, mediaEL: HTMLMediaElement, participantIdentity: string): void {

        let participantWrapper: HTMLElement | null = document.getElementById(participantIdentity);

        if (!participantWrapper) {
            participantWrapper = document.createElement('div');
            participantWrapper.id = participantIdentity;
            participantWrapper.classList.add('participant-wrapper', 'remote', participantIdentity);
        }

        if (mediaKind === 'audio') {
            const audioInfo: HTMLElement = document.createElement('span');
            audioInfo.classList.add('participant-audio-info', participantIdentity);

            const audioIcon = document.createElement('ion-icon');
            audioIcon.setAttribute('name', 'mic-off');
            audioInfo.appendChild(audioIcon);
            audioInfo.style.display = isTrackEnabled ? 'none' : 'block';
            participantWrapper.appendChild(audioInfo);
        } else if (mediaKind === 'video') {
            const participantAvatar: HTMLElement = document.createElement('span');
            const nameInitialEL: HTMLElement = document.createElement('p');
            nameInitialEL.textContent = participantName.charAt(0);

            const participantNameEL: HTMLElement = document.createElement('h4');
            participantNameEL.classList.add('participant-name', participantIdentity);
            participantNameEL.textContent = participantName.substring(0, participantName.indexOf('-'));

            participantAvatar.classList.add('participant-avatar', participantIdentity);
            participantAvatar.style.display = isTrackEnabled ? 'none' : 'flex';
            participantAvatar.appendChild(nameInitialEL);
            participantWrapper.appendChild(participantAvatar);
            participantWrapper.appendChild(participantNameEL);
        }

        participantWrapper.appendChild(mediaEL);
        wrapperEL.appendChild(participantWrapper);
    }

    private _attachLocalTracksWithElement(wrapperEL: HTMLElement, participantIdentity: string) {
        const participantWrapper: HTMLElement = document.createElement('div');
        participantWrapper.id = participantIdentity;

        participantWrapper.classList.add('participant-wrapper', 'local', participantIdentity);
        const audioInfo: HTMLElement = document.createElement('span');
        audioInfo.classList.add('participant-audio-info', participantIdentity);

        const audioIcon = document.createElement('ion-icon');
        audioIcon.setAttribute('name', 'mic-off');
        audioInfo.appendChild(audioIcon);
        audioInfo.style.display = this.localAudioTrack.isStopped && (!this.localAudioTrack.isEnabled) ? 'block' : 'none';

        const participantAvatar: HTMLElement = document.createElement('span');
        const nameInitialEL: HTMLElement = document.createElement('p');
        nameInitialEL.textContent = 'You';
        participantAvatar.classList.add('participant-avatar', participantIdentity);
        participantAvatar.style.display = this.localVideoTrack.isStopped && (!this.localVideoTrack.isEnabled) ? 'flex' : 'none';
        participantAvatar.appendChild(nameInitialEL);

        const participantNameEL: HTMLElement = document.createElement('h4');
        participantNameEL.classList.add('participant-name', participantIdentity);
        participantNameEL.textContent = 'You'

        participantWrapper.appendChild(audioInfo);
        participantWrapper.appendChild(participantAvatar);
        participantWrapper.appendChild(participantNameEL);
        participantWrapper.appendChild(this.localAudioTrack.attach());
        participantWrapper.appendChild(this.localVideoTrack.attach());

        wrapperEL.appendChild(participantWrapper);
    }

    private _participantWrapperEL(participantIdentity: string): HTMLElement | null {
        return document.getElementById(participantIdentity);
    }

    private _participantAvatarEL(participantIdentity: string): Element | undefined {
        return this._participantWrapperEL(participantIdentity)?.getElementsByClassName('participant-avatar')[0];
    }

    private _particiapntMediaEL(participantIdentity: string, mediaElName: string): Element | undefined {
        return this._participantWrapperEL(participantIdentity)?.getElementsByTagName(mediaElName)[0];
    }

    private _particiapntAudioInfoEL(participantIdentity: string): Element | undefined {
        return this._participantWrapperEL(participantIdentity)?.getElementsByClassName('participant-audio-info')[0];
    }

    enableLocalVideo(): boolean {
        this.localVideoTrack.enable();
        this.localVideoTrack.restart();
        if (this.activeRoom) {
            const participantAvatarEL = (this._participantAvatarEL(this.activeRoom.localParticipant.identity) as HTMLElement);
            if (participantAvatarEL) { participantAvatarEL.style.display = 'none'; }
        }
        console.log('local video track after enabling video -', this.localVideoTrack);
        return true;
    }
    disableLocalVideo(): boolean {
        this.localVideoTrack.disable();
        this.localVideoTrack.stop();
        if (this.activeRoom) {
            const participantAvatarEL = (this._participantAvatarEL(this.activeRoom.localParticipant.identity) as HTMLElement);
            if (participantAvatarEL) { participantAvatarEL.style.display = 'flex'; }
        }
        console.log('local video track after diabling video -', this.localVideoTrack);
        return this.localVideoTrack.isStopped;
    }

    disableLocalAudio(): boolean {
        this.localAudioTrack.disable();
        this.localAudioTrack.stop();
        if (this.activeRoom) {
            const participantAvatarEL = (this._particiapntAudioInfoEL(this.activeRoom.localParticipant.identity) as HTMLElement);
            if (participantAvatarEL) { participantAvatarEL.style.display = 'block'; }
        }
        console.log('local audio track after diabling audio -', this.localAudioTrack);
        return this.localAudioTrack.isStopped;
    }
    enableLocalAudio(): boolean {
        this.localAudioTrack.enable();
        this.localAudioTrack.restart();
        if (this.activeRoom) {
            const participantAvatarEL = (this._particiapntAudioInfoEL(this.activeRoom.localParticipant.identity) as HTMLElement);
            if (participantAvatarEL) { participantAvatarEL.style.display = 'none'; }
        }
        console.log('local audio track after enabling audio -', this.localAudioTrack);
        return true;
    }

    private _createLocalTracksAndAttachedWithProvidedELement(prevMediaEL: HTMLElement,
        options: CreateLocalTracksOptions): Promise<LocalTrack[]> {
        return createLocalTracks(options).catch((reason) => {
            console.log(reason);
            return [];
        }).then((localTracks: LocalTrack[]) => {
            localTracks.forEach((localTrack: LocalAudioTrack | LocalVideoTrack | LocalDataTrack) => {
                if (localTrack.kind === 'video') {
                    this.localVideoTrack = localTrack;
                    console.log('local video track after creating local tracks -', this.localVideoTrack);
                    prevMediaEL.appendChild((localTrack).attach());
                } else if (localTrack.kind === 'audio') {
                    this.localAudioTrack = localTrack;
                    console.log('local audio track after creating local tracks -', this.localAudioTrack);
                    prevMediaEL.appendChild((localTrack).attach());
                }
            });
            return localTracks;
        });
    }

    /** 
     * Connect to Twilio Room without attaching the local audio and video tracks in the room.
     */

    async accessRoomWithoutJoining(roomData: VideoRoom, prevMediaEL: HTMLElement,
        options: ConnectOptions): Promise<boolean> {
        this.roomData = roomData;
        this.localTracks = await this._createLocalTracksAndAttachedWithProvidedELement(prevMediaEL,
            { loggerName: options.loggerName, audio: options.audio, video: options.video });
        // this.activeRoom = await connect(this.roomData.token, {
        //     loggerName: options.loggerName, name: this.roomData.roomId,
        //     audio: false, video: false, dominantSpeaker: true
        // });
        console.log('local tracks created and attached to provided element');
        return !!this.localTracks;
    }

    async joinRoom(newMediaEL: HTMLElement): Promise<TracksStatus> {
        this._detachLocalTracksFromELement();
        this.remoteMediaEL = this.localMediaEL = newMediaEL;
        this.activeRoom = await connect(this.roomData.token, {
            name: this.roomData.roomId, tracks: this.localTracks,
            // audio: this.localAudioTrack.isEnabled, video: this.localVideoTrack.isEnabled
        }).then((room: Room) => {
            // this.localTracks = null; this.localAudioTrack.stop(); this.localVideoTrack.stop();
            room.localParticipant.tracks.forEach((trackPublication: LocalTrackPublication) => {
                if (trackPublication.kind === 'audio') {
                    this.localAudioTrack = trackPublication.track as LocalAudioTrack;
                } else if (trackPublication.kind === 'video') {
                    this.localVideoTrack = trackPublication.track as LocalVideoTrack;
                }
            })
            return room;
        });
        console.log('active room after joining in the room -', this.activeRoom);
        this._attachLocalTracksWithElement(newMediaEL, this.activeRoom.localParticipant.identity);
        return {
            isVideoDisabled: !this.localVideoTrack.isEnabled && this.localVideoTrack.isStopped,
            isAudioDisabled: !this.localAudioTrack.isEnabled && this.localAudioTrack.isStopped
        };
    }

    async changeLocalTracksAttachedEL(newMediaEL: HTMLElement): Promise<TracksStatus> {
        this._detachLocalTracksFromELement();
        this.remoteMediaEL = this.localMediaEL = newMediaEL;
        this._attachLocalTracksWithElement(newMediaEL, this.activeRoom.localParticipant.identity);
        this.activeRoom.localParticipant.publishTrack(this.localAudioTrack);
        this.activeRoom.localParticipant.publishTrack(this.localVideoTrack);
        return {
            isVideoDisabled: this.localVideoTrack.isStopped && (!this.localVideoTrack.isEnabled),
            isAudioDisabled: this.localAudioTrack.isStopped && (!this.localAudioTrack.isEnabled)
        };
    }

    private _handleTrackDisabled(track: RemoteTrack | null, participantIdentity: string): void {
        track?.on('disabled', (track: RemoteTrack) => {
            /* Hide the associated <video> element and show an avatar image. */
            if (track.kind === 'audio') {
                (this._particiapntAudioInfoEL(participantIdentity) as HTMLElement).style.display = 'block';
            } else if (track.kind === 'video') {
                (this._participantAvatarEL(participantIdentity) as HTMLElement).style.display = 'flex';
                (this._particiapntMediaEL(participantIdentity, 'video') as HTMLElement).style.display = 'none';
            }
        });
    }

    private _handleTrackEnabled(track: RemoteTrack | null, participantIdentity: string): void {
        track?.on('enabled', (track: RemoteTrack) => {
            /* Hide the associated <video> element and show an avatar image. */
            if (track.kind === 'audio') {
                (this._particiapntAudioInfoEL(participantIdentity) as HTMLElement).style.display = 'none';
            } else if (track.kind === 'video') {
                (this._participantAvatarEL(participantIdentity) as HTMLElement).style.display = 'none';
                (this._particiapntMediaEL(participantIdentity, 'video') as HTMLElement).style.display = 'block';
            }
        });
    }

    private _changeLayout() {
        const size: number = this.activeRoom.participants.size;
        if (size === 1) {
            this._participantWrapperEL(this.activeRoom.localParticipant.identity)?.classList.add('fixed');
        } else {
            this._participantWrapperEL(this.activeRoom.localParticipant.identity)?.classList.remove('fixed');
        }
        if (size < 3) {
            this.remoteMediaEL.classList.add('column');
        } else {
            this.remoteMediaEL.classList.remove('column');
        }
    }

    async connectWithRemoteParticipants(): Promise<void> {
        this._changeLayout();
        this.activeRoom.on('dominantSpeakerChanged', (speaker: RemoteParticipant) => {
            this._participantWrapperEL(speaker.identity)?.classList.add('dominant');
        })

        this.activeRoom.on('participantConnected', (participant: RemoteParticipant) => {
            this._changeLayout();
            console.log('new participant is connected', participant);
            // setTimeout(() => {
            //     console.log('new participant tracks after 3 seconds', participant.tracks);
            //     participant.tracks.forEach((trackPublication: RemoteTrackPublication) => {
            //         console.log('new participant is connected & trackpublication is-', trackPublication);
            //         if (trackPublication.isSubscribed && trackPublication.kind !== 'data' && trackPublication.track) {
            //             console.log(this.remoteMediaEL, trackPublication.kind,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isEnabled,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isStarted);
            //             this._attachMediaTrack(this.remoteMediaEL, trackPublication.kind,
            //                 trackPublication.isTrackEnabled,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).name,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).attach(), participant.identity);
            //             this._handleTrackDisabled(trackPublication.track, participant.identity);
            //             this._handleTrackEnabled(trackPublication.track, participant.identity);
            //         }
            //     });
            // }, 5000);
            participant.on('trackSubscribed', (track: RemoteTrack) => {
                console.log('track subscribed event of participant in participant connected later loop & track is-', track);
                if (track.kind !== 'data') {
                    this._attachMediaTrack(this.remoteMediaEL, track.kind, track.isEnabled,
                        (track as RemoteAudioTrack | RemoteVideoTrack).name,
                        (track as RemoteAudioTrack | RemoteVideoTrack).attach(), participant.identity);
                    this._handleTrackDisabled(track, participant.identity);
                    this._handleTrackEnabled(track, participant.identity);
                }
            });
            // participant.on('trackPublished', (publication: RemoteTrackPublication) => {
            //     console.log('track published event of participant iinside the participant connected later loop & track Publication is-', publication);
            // });
        });
        // this.activeRoom.on('trackSubscribed', (track: RemoteTrack, _publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        //     console.log('track subscribed event of participant & track is-', track);
        //     if (track.kind !== 'data') {
        //         this._attachMediaTrack(this.remoteMediaEL, track.kind,
        //             (track as RemoteAudioTrack | RemoteVideoTrack).isEnabled,
        //             (track as RemoteAudioTrack | RemoteVideoTrack).name,
        //             (track as RemoteAudioTrack | RemoteVideoTrack).attach(), participant.identity);
        //         this._handleTrackDisabled(track, participant.identity);
        //         this._handleTrackEnabled(track, participant.identity);
        //     }
        // });

        // this.activeRoom.on('trackPublished', (trackPublication: RemoteTrackPublication, _participant: RemoteParticipant) => {
        //     console.log('track published event of participant & track Publication is-', trackPublication);
        //     if (trackPublication.isSubscribed && trackPublication.kind !== 'data') {
        //         // this._attachMediaTrack(this.remoteMediaEL, trackPublication.kind,
        //         //     (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isEnabled &&
        //         //     (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isStarted,
        //         //     (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).name,
        //         //     (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).attach(), participant.identity);
        //         // this._handleTrackDisabled(trackPublication.track, participant.identity);
        //         // this._handleTrackEnabled(trackPublication.track, participant.identity);
        //     }
        // });

        this.activeRoom.on('participantDisconnected', (participant: RemoteParticipant) => {
            this._changeLayout();
            console.log('participant disconnected with the room -', participant);
            const participantWrapper = document.getElementById(participant.identity);
            participant.tracks.forEach((trackPublication: RemoteTrackPublication) => {
                if (trackPublication.track?.kind === 'audio' || trackPublication.track?.kind === 'video') {
                    (trackPublication?.track as RemoteAudioTrack | RemoteVideoTrack).detach().forEach((el: HTMLMediaElement) => {
                        el.remove();
                    });
                }
            })
            participantWrapper?.remove();
        });

        this.activeRoom.participants.forEach((participant: RemoteParticipant) => {
            console.log('checkign if there are already some participants or not, participants loop', participant);
            // participant.tracks.forEach((trackPublication: RemoteTrackPublication) => {
            //     console.log('participants already in room & track Publication is-', trackPublication);
            //     console.log('participants already in room & track Publications track is-', trackPublication.track);
            //     setTimeout(() => {
            //         if (trackPublication.isSubscribed && trackPublication.kind !== 'data' && trackPublication.track) {
            //             this._attachMediaTrack(this.remoteMediaEL, trackPublication.kind,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isEnabled &&
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).isStarted,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).name,
            //                 (trackPublication.track as RemoteAudioTrack | RemoteVideoTrack).attach(), participant.identity);
            //             this._handleTrackDisabled(trackPublication.track, participant.identity);
            //             this._handleTrackEnabled(trackPublication.track, participant.identity);
            //         }
            //     }, 3000);
            // });
            participant.on('trackSubscribed', (track: RemoteTrack) => {
                console.log('track subscribed event of participant in already connected participant loop & track is-', track);
                if (track.kind !== 'data') {
                    this._attachMediaTrack(this.remoteMediaEL, track.kind, track.isEnabled, track.name,
                        track.attach(), participant.identity);
                    this._handleTrackDisabled(track, participant.identity);
                    this._handleTrackEnabled(track, participant.identity);
                }
            });
        });

        this.activeRoom.on('disconnected', (room: Room) => {
            console.log('room Disconnect is called -', room); this.disconnectCall();
        });
    }

    /** OLD CODE */

    enableVideo(): void { this._toggleDeviceVideo(true); }
    disableVideo(): void { this._toggleDeviceVideo(false); }

    enableAudio(): void { this._toggleDeviceAudio(true); }
    disableAudio(): void { this._toggleDeviceAudio(false); }

    private _toggleDeviceVideo(enable: boolean): void {
        try {
            this.activeRoom.localParticipant.videoTracks.forEach((trackPublicn: LocalVideoTrackPublication) => {
                enable ? trackPublicn.track.enable() : trackPublicn.track.disable();
            });
        } catch (error) { console.log(error); }
    }

    private _toggleDeviceAudio(enable: boolean): void {
        try {
            this.activeRoom.localParticipant.audioTracks.forEach((trackPublicn: LocalAudioTrackPublication) => {
                enable ? trackPublicn.track.enable() : trackPublicn.track.disable();
            });
        } catch (error) { console.log(error); }
    }

    makeCall(roomData: VideoRoom, localMediaEL: HTMLElement, remoteMediaEL: HTMLElement): Promise<RoomConnectionStatus> {
        this.roomData = roomData; this.localMediaEL = localMediaEL; this.remoteMediaEL = remoteMediaEL;
        return this._connectRoom({ name: roomData.roomId, tracks: this.localTracks });
    }

    private async _connectRoom(connectOptions: ConnectOptions) {
        await connect(this.roomData.token, connectOptions).then((twilioRoom: Room) => {
            this.activeRoom = twilioRoom;
            this._attachTracks();
            return twilioRoom;
        });
        return this.activeRoom ? RoomConnectionStatus.SUCCESS : RoomConnectionStatus.FAILURE;
    }

    private _attachTracks() {
        this._attachLocalParticipantTracks();
        this._attachRemoteParticipantTracks();
    }

    private _detachTracks(track: LocalAudioTrack | LocalVideoTrack | RemoteAudioTrack | RemoteVideoTrack) {
        track.detach().forEach((el: HTMLMediaElement) => { el.remove(); })
    }

    private _attachLocalParticipantTracks() {
        this.activeRoom.localParticipant.tracks.forEach((trackPublcn: LocalTrackPublication) => {
            // for (let i = 0; i < 8; i++) {
            const videoWrapper = document.createElement('div');
            videoWrapper.className = trackPublcn.kind === 'video' ? 'video-wrapper' : 'audio-wrapper';
            this.localMediaEL.appendChild(videoWrapper);
            this._attachMediaElement(videoWrapper, (trackPublcn.track as LocalAudioTrack | LocalVideoTrack));
            // }
        });
    }

    private _attachRemoteParticipantTracks() {
        /**
         * this will work when remoteparticipants already exist in room
         */
        this.activeRoom.participants.forEach((participant: RemoteParticipant) => {
            participant.on('trackSubscribed', (track: RemoteVideoTrack | RemoteAudioTrack,
                trackPublcn: RemoteTrackPublication) => {
                const videoWrapper = document.createElement('div');
                videoWrapper.className = trackPublcn.kind === 'video' ? 'video-wrapper' : 'audio-wrapper';
                this.remoteMediaEL.appendChild(videoWrapper);
                this._attachMediaElement(videoWrapper, track);
            });

            participant.on('trackDisabled', (track: RemoteTrackPublication) => {
                console.log('remote track disabled', track);
            });

            participant.on('trackEnabled', (track: RemoteTrackPublication) => {
                console.log('remote track enabled', track);
            });

            participant.on('trackUnsubscribed', (track: RemoteVideoTrack | RemoteAudioTrack) => {
                this._detachTracks(track);
            });

        });
        /** these events will fire when remote participant joins the room after the room is created and register the tracks of remote participants */
        this.activeRoom.on('participantConnected', (participant: RemoteParticipant) => {
            if (this.hasListeners('participantJoined')) {
                const info: RoomParticipantsSize = this.activeRoom.participants.size ? this.activeRoom.participants.size + 1 : 1;
                this.notifyListeners('participantJoined', info);
            }
            participant.on('trackSubscribed', (track: RemoteVideoTrack | RemoteAudioTrack, trackPublcn: RemoteTrackPublication) => {
                const videoWrapper = document.createElement('div');
                videoWrapper.className = trackPublcn.kind === 'video' ? 'video-wrapper' : 'audio-wrapper';
                this.remoteMediaEL.appendChild(videoWrapper);
                this._attachMediaElement(videoWrapper, track);
            });
            participant.on('trackUnsubscribed', (track: RemoteVideoTrack | RemoteAudioTrack) => {
                this._detachTracks(track);
            });
        });
        /** these events will fire when participant leaves the room before you leave and detach all the tracks of remote participants */
        this.activeRoom.on('participantDisconnected', (particpnt: RemoteParticipant) => {
            console.log('participant disconnected event', particpnt);
        });
    }

    private _attachMediaElement(el: HTMLElement,
        track: LocalAudioTrack | LocalVideoTrack | RemoteAudioTrack | RemoteVideoTrack) {
        el.appendChild(track.attach());
    }
}
