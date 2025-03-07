import express from "express";
import supabase from "../supabaseClient.js"; // Import shared Supabase client

const router = express.Router();

// Save Key-Value Pair
router.post("/save", async (req, res) => {
    const { key_name, value } = req.body;
  
    if (!key_name || typeof key_name !== "string") {
      return res.status(400).json({ error: "Invalid key_name" });
    }
  
    // Ensure value is JSON (JSONB in Supabase)
    let jsonValue;
    try {
      jsonValue = typeof value === "string" ? JSON.parse(value) : value;
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
  
    const { data, error } = await supabase
      .from("chatapp_content")
      .upsert([{ key_name, value: jsonValue }], { onConflict: "key_name" });
  
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Data saved successfully", data });
  });

// 📌 Get value by key
// 📌 Get value by key
router.get("/get/:key_name", async (req, res) => {
    const { key_name } = req.params;

    const { data, error } = await supabase
        .from("chatapp_content") // Ensure same table name
        .select("value")
        .eq("key_name", key_name)
        .single(); // Get single row

    if (error || !data) return res.status(404).json({ error: "Key not found" });

    res.json({ key_name, value: data.value });
});

// Export the router
export default router;
