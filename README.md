# syntagi-twilio-video

multiparty video calls using twilio video sdk

## Install

```bash
npm install syntagi-twilio-video
npx cap sync
```

## API

<docgen-index>

* [`enableVideo()`](#enablevideo)
* [`disableVideo()`](#disablevideo)
* [`enableAudio()`](#enableaudio)
* [`disableAudio()`](#disableaudio)
* [`removeAllListeners()`](#removealllisteners)
* [`disconnectCall()`](#disconnectcall)
* [`participantsSize()`](#participantssize)
* [`disableLocalVideo()`](#disablelocalvideo)
* [`enableLocalVideo()`](#enablelocalvideo)
* [`disableLocalAudio()`](#disablelocalaudio)
* [`enableLocalAudio()`](#enablelocalaudio)
* [`connectWithRemoteParticipants()`](#connectwithremoteparticipants)
* [`changeLocalTracksAttachedEL(...)`](#changelocaltracksattachedel)
* [`accessRoomWithoutJoining(...)`](#accessroomwithoutjoining)
* [`joinRoom(...)`](#joinroom)
* [`makeCall(...)`](#makecall)
* [`addListener('participantJoined', ...)`](#addlistenerparticipantjoined)
* [`addListener('participantDisconnected', ...)`](#addlistenerparticipantdisconnected)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### enableVideo()

```typescript
enableVideo() => void
```

--------------------


### disableVideo()

```typescript
disableVideo() => void
```

--------------------


### enableAudio()

```typescript
enableAudio() => void
```

--------------------


### disableAudio()

```typescript
disableAudio() => void
```

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

--------------------


### disconnectCall()

```typescript
disconnectCall() => Promise<RoomConnectionStatus>
```

**Returns:** <code>Promise&lt;<a href="#roomconnectionstatus">RoomConnectionStatus</a>&gt;</code>

--------------------


### participantsSize()

```typescript
participantsSize() => Promise<number>
```

**Returns:** <code>Promise&lt;number&gt;</code>

--------------------


### disableLocalVideo()

```typescript
disableLocalVideo() => boolean
```

**Returns:** <code>boolean</code>

--------------------


### enableLocalVideo()

```typescript
enableLocalVideo() => boolean
```

**Returns:** <code>boolean</code>

--------------------


### disableLocalAudio()

```typescript
disableLocalAudio() => boolean
```

**Returns:** <code>boolean</code>

--------------------


### enableLocalAudio()

```typescript
enableLocalAudio() => boolean
```

**Returns:** <code>boolean</code>

--------------------


### connectWithRemoteParticipants()

```typescript
connectWithRemoteParticipants() => void
```

--------------------


### changeLocalTracksAttachedEL(...)

```typescript
changeLocalTracksAttachedEL(newMediaEL: any) => Promise<TracksStatus>
```

| Param            | Type             |
| ---------------- | ---------------- |
| **`newMediaEL`** | <code>any</code> |

**Returns:** <code>Promise&lt;<a href="#tracksstatus">TracksStatus</a>&gt;</code>

--------------------


### accessRoomWithoutJoining(...)

```typescript
accessRoomWithoutJoining(roomData: VideoRoom, prevMediaEL: any, options: ConnectOptions) => Promise<boolean>
```

| Param             | Type                                                      |
| ----------------- | --------------------------------------------------------- |
| **`roomData`**    | <code><a href="#videoroom">VideoRoom</a></code>           |
| **`prevMediaEL`** | <code>any</code>                                          |
| **`options`**     | <code><a href="#connectoptions">ConnectOptions</a></code> |

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### joinRoom(...)

```typescript
joinRoom(newMediaEL: any) => Promise<TracksStatus | null>
```

| Param            | Type             |
| ---------------- | ---------------- |
| **`newMediaEL`** | <code>any</code> |

**Returns:** <code>Promise&lt;<a href="#tracksstatus">TracksStatus</a>&gt;</code>

--------------------


### makeCall(...)

```typescript
makeCall(roomData: VideoRoom, localMediaEL: any, remoteMediaEL: any) => Promise<RoomConnectionStatus>
```

| Param               | Type                                            |
| ------------------- | ----------------------------------------------- |
| **`roomData`**      | <code><a href="#videoroom">VideoRoom</a></code> |
| **`localMediaEL`**  | <code>any</code>                                |
| **`remoteMediaEL`** | <code>any</code>                                |

**Returns:** <code>Promise&lt;<a href="#roomconnectionstatus">RoomConnectionStatus</a>&gt;</code>

--------------------


### addListener('participantJoined', ...)

```typescript
addListener(eventName: 'participantJoined', listenerFunc: ListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'participantJoined'</code>                              |
| **`listenerFunc`** | <code><a href="#listenercallback">ListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('participantDisconnected', ...)

```typescript
addListener(eventName: 'participantDisconnected', listenerFunc: ListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'participantDisconnected'</code>                        |
| **`listenerFunc`** | <code><a href="#listenercallback">ListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### TracksStatus

| Prop                  | Type                 |
| --------------------- | -------------------- |
| **`isVideoDisabled`** | <code>boolean</code> |
| **`isAudioDisabled`** | <code>boolean</code> |


#### VideoRoom

| Prop                | Type                 |
| ------------------- | -------------------- |
| **`appointmentId`** | <code>string</code>  |
| **`roomId`**        | <code>string</code>  |
| **`token`**         | <code>string</code>  |
| **`userId`**        | <code>string</code>  |
| **`userRole`**      | <code>number</code>  |
| **`userName`**      | <code>string</code>  |
| **`userImage`**     | <code>string</code>  |
| **`fromUserId`**    | <code>string</code>  |
| **`fromUserRole`**  | <code>number</code>  |
| **`fromUserName`**  | <code>string</code>  |
| **`fromUserImage`** | <code>string</code>  |
| **`makeCall`**      | <code>boolean</code> |
| **`connect`**       | <code>boolean</code> |
| **`to`**            | <code>string</code>  |
| **`To`**            | <code>string</code>  |


#### ConnectOptions

| Prop                        | Type                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`audio`**                 | <code>boolean \| <a href="#createlocaltrackoptions">CreateLocalTrackOptions</a> \| <a href="#createlocalaudiotrackoptions">CreateLocalAudioTrackOptions</a></code>                                |
| **`automaticSubscription`** | <code>boolean</code>                                                                                                                                                                              |
| **`bandwidthProfile`**      | <code><a href="#bandwidthprofileoptions">BandwidthProfileOptions</a></code>                                                                                                                       |
| **`dominantSpeaker`**       | <code>boolean</code>                                                                                                                                                                              |
| **`dscpTagging`**           | <code>boolean</code>                                                                                                                                                                              |
| **`enableDscp`**            | <code>boolean</code>                                                                                                                                                                              |
| **`loggerName`**            | <code>string</code>                                                                                                                                                                               |
| **`eventListener`**         | <code>EventListener</code>                                                                                                                                                                        |
| **`iceServers`**            | <code><a href="#array">Array</a>&lt;RTCIceServer&gt;</code>                                                                                                                                       |
| **`iceTransportPolicy`**    | <code>RTCIceTransportPolicy</code>                                                                                                                                                                |
| **`insights`**              | <code>boolean</code>                                                                                                                                                                              |
| **`maxAudioBitrate`**       | <code>number</code>                                                                                                                                                                               |
| **`maxVideoBitrate`**       | <code>number</code>                                                                                                                                                                               |
| **`name`**                  | <code>string</code>                                                                                                                                                                               |
| **`networkQuality`**        | <code>boolean \| <a href="#networkqualityconfiguration">NetworkQualityConfiguration</a></code>                                                                                                    |
| **`notifyWarnings`**        | <code><a href="#array">Array</a>&lt;<a href="#notifywarning">NotifyWarning</a>&gt;</code>                                                                                                         |
| **`region`**                | <code>string</code>                                                                                                                                                                               |
| **`preferredAudioCodecs`**  | <code><a href="#array">Array</a>&lt;<a href="#audiocodec">AudioCodec</a> \| <a href="#audiocodecsettings">AudioCodecSettings</a> \| <a href="#opuscodecsettings">OpusCodecSettings</a>&gt;</code> |
| **`preferredVideoCodecs`**  | <code>'auto' \| (<a href="#videocodec">VideoCodec</a> \| <a href="#videocodecsettings">VideoCodecSettings</a> \| <a href="#vp8codecsettings">VP8CodecSettings</a>)[]</code>                       |
| **`logLevel`**              | <code><a href="#loglevel">LogLevel</a> \| <a href="#loglevels">LogLevels</a></code>                                                                                                               |
| **`tracks`**                | <code><a href="#array">Array</a>&lt;<a href="#localtrack">LocalTrack</a> \| MediaStreamTrack&gt;</code>                                                                                           |
| **`video`**                 | <code>boolean \| <a href="#createlocaltrackoptions">CreateLocalTrackOptions</a></code>                                                                                                            |


#### CreateLocalTrackOptions

| Prop                             | Type                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| **`logLevel`**                   | <code><a href="#loglevel">LogLevel</a> \| <a href="#loglevels">LogLevels</a></code> |
| **`name`**                       | <code>string</code>                                                                 |
| **`workaroundWebKitBug180748`**  | <code>boolean</code>                                                                |
| **`workaroundWebKitBug1208516`** | <code>boolean</code>                                                                |


#### LogLevels

| Prop            | Type                                          |
| --------------- | --------------------------------------------- |
| **`default`**   | <code><a href="#loglevel">LogLevel</a></code> |
| **`media`**     | <code><a href="#loglevel">LogLevel</a></code> |
| **`signaling`** | <code><a href="#loglevel">LogLevel</a></code> |
| **`webrtc`**    | <code><a href="#loglevel">LogLevel</a></code> |


#### CreateLocalAudioTrackOptions

| Prop                           | Type                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------- |
| **`defaultDeviceCaptureMode`** | <code><a href="#defaultdevicecapturemode">DefaultDeviceCaptureMode</a></code> |
| **`noiseCancellationOptions`** | <code><a href="#noisecancellationoptions">NoiseCancellationOptions</a></code> |


#### NoiseCancellationOptions

| Prop                | Type                                                                        |
| ------------------- | --------------------------------------------------------------------------- |
| **`sdkAssetsPath`** | <code>string</code>                                                         |
| **`vendor`**        | <code><a href="#noisecancellationvendor">NoiseCancellationVendor</a></code> |


#### BandwidthProfileOptions

| Prop        | Type                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| **`video`** | <code><a href="#videobandwidthprofileoptions">VideoBandwidthProfileOptions</a></code> |


#### VideoBandwidthProfileOptions

| Prop                              | Type                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| **`contentPreferencesMode`**      | <code><a href="#videocontentpreferencesmode">VideoContentPreferencesMode</a></code> |
| **`dominantSpeakerPriority`**     | <code>Track.Priority</code>                                                         |
| **`maxSubscriptionBitrate`**      | <code>number</code>                                                                 |
| **`maxTracks`**                   | <code>number</code>                                                                 |
| **`mode`**                        | <code><a href="#bandwidthprofilemode">BandwidthProfileMode</a></code>               |
| **`renderDimensions`**            | <code><a href="#videorenderdimensions">VideoRenderDimensions</a></code>             |
| **`clientTrackSwitchOffControl`** | <code><a href="#clienttrackswitchoffcontrol">ClientTrackSwitchOffControl</a></code> |
| **`trackSwitchOffMode`**          | <code><a href="#trackswitchoffmode">TrackSwitchOffMode</a></code>                   |


#### VideoRenderDimensions

| Prop           | Type                               |
| -------------- | ---------------------------------- |
| **`high`**     | <code>VideoTrack.Dimensions</code> |
| **`low`**      | <code>VideoTrack.Dimensions</code> |
| **`standard`** | <code>VideoTrack.Dimensions</code> |


#### Array

| Prop         | Type                | Description                                                                                            |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| **`length`** | <code>number</code> | Gets or sets the length of the array. This is a number one higher than the highest index in the array. |

| Method             | Signature                                                                                                                     | Description                                                                                                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**       | () =&gt; string                                                                                                               | Returns a string representation of an array.                                                                                                                                                                                                |
| **toLocaleString** | () =&gt; string                                                                                                               | Returns a string representation of an array. The elements are converted to string using their toLocalString methods.                                                                                                                        |
| **pop**            | () =&gt; T \| undefined                                                                                                       | Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                          |
| **push**           | (...items: T[]) =&gt; number                                                                                                  | Appends new elements to the end of an array, and returns the new length of the array.                                                                                                                                                       |
| **concat**         | (...items: <a href="#concatarray">ConcatArray</a>&lt;T&gt;[]) =&gt; T[]                                                       | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **concat**         | (...items: (T \| <a href="#concatarray">ConcatArray</a>&lt;T&gt;)[]) =&gt; T[]                                                | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **join**           | (separator?: string) =&gt; string                                                                                             | Adds all the elements of an array into a string, separated by the specified separator string.                                                                                                                                               |
| **reverse**        | () =&gt; T[]                                                                                                                  | Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                        |
| **shift**          | () =&gt; T \| undefined                                                                                                       | Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                         |
| **slice**          | (start?: number, end?: number) =&gt; T[]                                                                                      | Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.                           |
| **sort**           | (compareFn?: (a: T, b: T) =&gt; number) =&gt; this                                                                            | Sorts an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                                           |
| **splice**         | (start: number, deleteCount?: number) =&gt; T[]                                                                               | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **splice**         | (start: number, deleteCount: number, ...items: T[]) =&gt; T[]                                                                 | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **unshift**        | (...items: T[]) =&gt; number                                                                                                  | Inserts new elements at the start of an array, and returns the new length of the array.                                                                                                                                                     |
| **indexOf**        | (searchElement: T, fromIndex?: number) =&gt; number                                                                           | Returns the index of the first occurrence of a value in an array, or -1 if it is not present.                                                                                                                                               |
| **lastIndexOf**    | (searchElement: T, fromIndex?: number) =&gt; number                                                                           | Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.                                                                                                                                      |
| **every**          | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; this is S[]       | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **every**          | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **some**           | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| **forEach**        | (callbackfn: (value: T, index: number, array: T[]) =&gt; void, thisArg?: any) =&gt; void                                      | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| **map**            | &lt;U&gt;(callbackfn: (value: T, index: number, array: T[]) =&gt; U, thisArg?: any) =&gt; U[]                                 | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| **filter**         | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; S[]               | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **filter**         | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; T[]                                     | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |


#### ConcatArray

| Prop         | Type                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |

| Method    | Signature                                |
| --------- | ---------------------------------------- |
| **join**  | (separator?: string) =&gt; string        |
| **slice** | (start?: number, end?: number) =&gt; T[] |


#### NetworkQualityConfiguration

| Prop         | Type                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| **`local`**  | <code><a href="#networkqualityverbosity">NetworkQualityVerbosity</a></code> |
| **`remote`** | <code><a href="#networkqualityverbosity">NetworkQualityVerbosity</a></code> |


#### AudioCodecSettings

| Prop        | Type                                              |
| ----------- | ------------------------------------------------- |
| **`codec`** | <code><a href="#audiocodec">AudioCodec</a></code> |


#### OpusCodecSettings

| Prop        | Type                 |
| ----------- | -------------------- |
| **`codec`** | <code>'opus'</code>  |
| **`dtx`**   | <code>boolean</code> |


#### VideoCodecSettings

| Prop        | Type                                              |
| ----------- | ------------------------------------------------- |
| **`codec`** | <code><a href="#videocodec">VideoCodec</a></code> |


#### VP8CodecSettings

| Prop            | Type                 |
| --------------- | -------------------- |
| **`codec`**     | <code>'VP8'</code>   |
| **`simulcast`** | <code>boolean</code> |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### LogLevel

<code>'debug' | 'info' | 'warn' | 'error' | 'off'</code>


#### DefaultDeviceCaptureMode

<code>'auto' | 'manual'</code>


#### NoiseCancellationVendor

<code>'krisp' | 'rnnoise'</code>


#### VideoContentPreferencesMode

<code>'auto' | 'manual'</code>


#### BandwidthProfileMode

<code>'grid' | 'collaboration' | 'presentation'</code>


#### ClientTrackSwitchOffControl

<code>'auto' | 'manual'</code>


#### TrackSwitchOffMode

<code>'detected' | 'predicted' | 'disabled'</code>


#### NetworkQualityVerbosity

<code>0 | 1 | 2 | 3</code>


#### NotifyWarning

<code>'recording-media-lost'</code>


#### AudioCodec

<code>'isac' | 'opus' | 'PCMA' | 'PCMU'</code>


#### VideoCodec

<code>'H264' | 'VP8' | 'VP9'</code>


#### VideoEncodingMode

<code>'auto'</code>


#### LocalTrack

<code>LocalAudioTrack | LocalVideoTrack | LocalDataTrack</code>


#### ListenerCallback

<code>(err: any, ...args: any[]): void</code>


### Enums


#### RoomConnectionStatus

| Members            | Value          |
| ------------------ | -------------- |
| **`FAILURE`**      | <code>0</code> |
| **`SUCCESS`**      | <code>1</code> |
| **`DISCONNECTED`** | <code>2</code> |

</docgen-api>
