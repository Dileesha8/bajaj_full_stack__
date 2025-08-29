import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

/**
 * Helpers
 */
const isNumericString = (s) => typeof s === "string" && /^[+-]?\d+$/.test(s.trim());
const isAlphabeticString = (s) => typeof s === "string" && /^[A-Za-z]+$/.test(s.trim());

function alternatingCapsReverseConcat(allAlphaChars) {
  // reverse, then alternate: Upper, lower, Upper, lower, ...
  const rev = allAlphaChars.split("").reverse();
  return rev
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body ?? {};
    const input = Array.isArray(body.data) ? body.data : null;

    if (!input) {
      return res.status(400).json({
        is_success: false,
        user_id: `${process.env.FULL_NAME}_${process.env.DOB_DDMMYYYY}`,
        email: process.env.EMAIL || "",
        roll_number: process.env.ROLL_NUMBER || "",
        message: "Invalid payload: 'data' must be an array of strings."
      });
    }

    // Buckets
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    // For concat rule: collect all alphabetic characters in order of appearance (from all entries)
    let alphaCharsStream = "";

    // Sum of numbers
    let sum = 0;

    for (const item of input) {
      const s = String(item);

      if (isNumericString(s)) {
        // keep numbers as strings
        const n = parseInt(s, 10);
        sum += n;
        if (Math.abs(n) % 2 === 0) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
        continue;
      }

      if (isAlphabeticString(s)) {
        alphabets.push(s.toUpperCase());
        // push characters for concat stream
        alphaCharsStream += s;
        continue;
      }

      // Not purely number or alphabet-only => special char string
      special_characters.push(s);

      // Also extract alphabetic chars embedded inside mixed tokens (e.g., "ab#12")
      // because the concat rule is "all alphabetical characters present in the input".
      const lettersOnly = s.match(/[A-Za-z]/g);
      if (lettersOnly) alphaCharsStream += lettersOnly.join("");
    }

    const concat_string = alternatingCapsReverseConcat(alphaCharsStream);
    const payload = {
      is_success: true,
      user_id: `${process.env.FULL_NAME}_${process.env.DOB_DDMMYYYY}`,
      email: process.env.EMAIL || "",
      roll_number: process.env.ROLL_NUMBER || "",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),            // sum must be a string
      concat_string
    };

    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      user_id: `${process.env.FULL_NAME}_${process.env.DOB_DDMMYYYY}`,
      email: process.env.EMAIL || "",
      roll_number: process.env.ROLL_NUMBER || "",
      message: "Internal Server Error"
    });
  }
});

// Health check (optional)
app.get("/", (_req, res) => {
  res.status(200).send("BFHL API up");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
