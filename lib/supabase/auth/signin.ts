import { supabaseClient } from '../client'

interface ISignInUser {
    email: string
    password: string
}

export const signInUser = async ({ email, password }: ISignInUser) => {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return { isErrorTrue: true, errorMessage: error.message }
        }

        return {
            isErrorTrue: false,
            data: {
                user: data.user,
                session: data.session,
                message: 'Signed in successfully',
            },
        }
    } catch (err) {
        console.error('Unexpected signin error:', err)
        return { isErrorTrue: true, errorMessage: 'Unexpected error occurred.' }
    }
}

interface ISignInWithGoogle {
    redirectURL: string
}

export const signInWithGoogle = async ({ redirectURL }: ISignInWithGoogle) => {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectURL,
            },
        })

        if (error) {
            return { isErrorTrue: true, errorMessage: error.message }
        }

        return { isErrorTrue: false, data, message: 'Google sign-in initiated' }
    } catch (err) {
        console.error('Unexpected Google sign-in error:', err)
        return { isErrorTrue: true, errorMessage: 'Unexpected error occurred.' }
    }
}

export async function signInWithGitHub({ redirectURL }: { redirectURL: string }) {
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: redirectURL,
        },
    })

    if (error) {
        throw new Error(error.message)
    }
}
