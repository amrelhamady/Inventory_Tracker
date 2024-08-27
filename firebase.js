"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, getDoc, getDocs, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch inventory items from Firestore
  const updateInventory = async () => {
    try {
      const inventoryRef = collection(firestore, "inventory");
      const snapshot = await getDocs(inventoryRef);
      const inventoryList = snapshot.docs.map(doc => ({
        name: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryList);
      console.log("Inventory updated:", inventoryList);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  // Add or update an item
  const addItem = async (item) => {
    if (item.trim() === "") return;

    try {
      const docRef = doc(collection(firestore, "inventory"), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }

      console.log(`Item added or updated: ${item}`);
      await updateInventory();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Remove an item
  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "inventory"), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      console.log(`Item removed: ${item}`);
      await updateInventory();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter items based on search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="contained" 
        onClick={handleOpen}
      >
        Add Item
      </Button>
      <Box border="1px solid #333" mb={2}> 
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD836"
          alignItems="center" 
          justifyContent="center"
          display="flex"
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Stack width="800px" mb={2} direction="row" spacing={2}>
        <TextField 
          variant="outlined"
          fullWidth
          placeholder="Search items"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </Stack>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {filteredInventory.length > 0 ? (
          filteredInventory.map(({ name, quantity }) => (
            <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f0f0f0" padding={5}>
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="h6" color="#333" textAlign="center">
            No items found
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
