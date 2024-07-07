'use server';

import { createClient } from '@/lib/supabase';
import { ServerResponse } from '@/lib/types';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

export const loginUser: (
	email: string,
	password: string
) => Promise<ServerResponse> = async (email: string, password: string) => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return {
			code: 409,
			message: 'User is already logged in',
		};
	}
	return supabase.auth
		.signInWithPassword({ email: email, password: password })
		.then((response: AuthResponse) => {
			if (response.error) {
				const error: AuthError = response.error;
				return {
					code: 400,
					message: error.message,
				};
			}

			return {
				code: 200,
				message: 'User Logged In',
			};
		})
		.catch((error: any) => {
			return {
				code: 500,
				message: 'Something went wrong!',
			};
		});
};

export const logoutUser: () => Promise<ServerResponse> = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			code: 409,
			message: 'User is already logged out',
		};
	}
	return supabase.auth
		.signOut()
		.then((response) => {
			if (response.error) {
				const error: AuthError = response.error;
				return {
					code: 400,
					message: error.message,
				};
			}

			return {
				code: 200,
				message: 'User Logged Out',
			};
		})
		.catch((error: any) => {
			return {
				code: 500,
				message: 'Something went wrong!',
			};
		});
};
