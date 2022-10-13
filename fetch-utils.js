const SUPABASE_URL = 'https://gkddqbrmoiquzzarmnsl.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZGRxYnJtb2lxdXp6YXJtbnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MTY5NDQsImV4cCI6MTk4MTA5Mjk0NH0.m_Jmv_ZHU1PMlw4OiuXSeNpE0b3dUxFGuLJekdqKVzY';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createPost(post) {
    return await client.from('commenthold').insert(post).single();
}

export async function getPosts() {
    return await client
        .from('commenthold')
        .select('*, user_id:profiles(user_id, username, image_url, color)');
}

export async function getPost(id) {
    return await client
        .from('commenthold')
        .select('*, user_id: profiles(user_id, username, image_url, color)')
        .eq('id', id)
        .single();
}

export function onMessage(handleMessage) {
    client.from('commenthold').on('INSERT', handleMessage).subscribe();
}

export async function updateProfile(profile) {
    return await client.from('profiles').upsert(profile).single().eq('user_id', profile.user_id);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
