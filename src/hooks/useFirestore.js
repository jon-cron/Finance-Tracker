import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

// NOTE making the params dynamic allows for more versatility of the hook
export const useFirestore = (collection) => {};
