import supabase, { supabaseUrl } from "./supabase.js";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data: user, error: userError } = await supabase.auth.getUser();

  return user.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  let update;

  if (password) update = { password };
  if (fullName) update = { data: { fullName } };

  const { data: updatedUser, error: updatePassOrNameError } =
    await supabase.auth.updateUser(update);

  if (updatePassOrNameError) {
    throw new Error(updatePassOrNameError.message);
  }

  if (!avatar) {
    return updatedUser;
  }

  const fileName = `avatar-${updatedUser.user.id}-${Math.random()}`;

  const { error: fileUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (fileUploadError) {
    throw new Error(fileUploadError.message);
  }

  const { data: updatedUser2, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateAvatarError) {
    throw new Error(updateAvatarError.message);
  }

  return updatedUser2;
}
