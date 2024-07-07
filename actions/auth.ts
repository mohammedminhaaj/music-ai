'use server';

import { createClient } from '@/lib/supabase';
import { ServerResponse } from '@/lib/types';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

export const loginUser: (
	email: string,
	password: string
) => Promise<ServerResponse> = async (email: string, password: string) => {
	// Get superbase client
	const supabase = createClient();

	// Get the current user
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If the user is available, return with a message
	if (user) {
		return {
			code: 409,
			message: 'User is already logged in',
		};
	}

	// Use supabase auth functionality to login a user
	return supabase.auth
		.signInWithPassword({ email: email, password: password })
		.then((response: AuthResponse) => {
			// Check if the response has any errors
			if (response.error) {
				const error: AuthError = response.error;
				return {
					code: 400,
					message: error.message,
				};
			}

			// Return success
			return {
				code: 200,
				message: 'User Logged In',
			};
		})
		.catch((error: any) => {
			// Return any errors caused during the process
			return {
				code: 500,
				message: 'Something went wrong!',
			};
		});
};

export const logoutUser: () => Promise<ServerResponse> = async () => {
	// Get supabase client
	const supabase = createClient();

	// Check if the user is present
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If the user is not available, return with a message
	if (!user) {
		return {
			code: 409,
			message: 'User is already logged out',
		};
	}

	// Perform logout
	return supabase.auth
		.signOut()
		.then((response) => {
			// Check if the response has any errors
			if (response.error) {
				const error: AuthError = response.error;
				return {
					code: 400,
					message: error.message,
				};
			}

			// Return success
			return {
				code: 200,
				message: 'User Logged Out',
			};
		})
		.catch((error: any) => {
			// Return errors which are triggered during the process
			return {
				code: 500,
				message: 'Something went wrong!',
			};
		});
};
