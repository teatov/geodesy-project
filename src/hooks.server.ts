import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';


// export const customHandle: Handle = async ({ event, resolve }) => {
// 	// event.locals.auth = auth.handleRequest(event);
// 	return await resolve(event);
// };

// export const handle: Handle = sequence(handleHooks(auth), customHandle);

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};