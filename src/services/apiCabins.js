import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Error while loading the cabins.");
  }

  return data;
}

export async function getCabinsIdAndName() {
  const { data, error } = await supabase
    .from("cabins")
    .select("name, id, maxCapacity, regularPrice, discount")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Error while loading the cabins.");
  }

  return data;
}

export async function createCabin(newCabin) {
  const newImage = typeof newCabin.image !== "string";

  const imageName = `${Math.random()}${newCabin.image?.name?.replaceAll(
    "/",
    ""
  )}`;

  const imagePath = newImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  const { data, error: fileAddError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (fileAddError) {
    throw new Error("Error while creating the cabin.");
  }

  if (newImage) {
    const { error: fileUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (fileUploadError) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error(
        "Error while uploading the image and cabin can't be created."
      );
    }
  }

  return data;
}

export async function updateCabin({ editCabin, editId }) {
  const newImage = typeof editCabin.image !== "string";

  const imageName = `${Math.random()}${editCabin.image[0]?.name?.replaceAll(
    "/",
    ""
  )}`;
  const imagePath = newImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : editCabin.image;

  const { data, error: fileEditError } = await supabase
    .from("cabins")
    .update({ ...editCabin, image: imagePath })
    .eq("id", editId)
    .select();

  if (fileEditError) {
    throw new Error("Error while updating the cabin.");
  }

  if (newImage) {
    const { error: fileUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, editCabin.image[0]);

    if (fileUploadError) {
      // await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error(
        "Error while uploading the image and cabin can't be updated."
      );
    }
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) {
    throw new Error("Error while deleting the cabin.");
  }

  return data;
}
