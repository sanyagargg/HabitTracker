import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGlobalContextProvider } from '@/Types/contextApi';
import { defaultColor } from '@/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(
    name: string, 
    selectedNames: readonly string[], 
    theme: Theme) {
  return {
    fontWeight: 
    selectedNames.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
    onChange,
}: {
  onChange: (selectedAreasItems: any) => void;
}) {
  const theme = useTheme();

  const { allAreasObject } = useGlobalContextProvider();
  const { allAreas } = allAreasObject;

  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);

  const [selectedAreasItems, setSelectedAreasItems] = React.useState<any>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }; 

  // Filter out the "All" element
  const filteredAreas = allAreas.filter((area) => area.name !== "All");

  // This useEffect enables us to save the whole object that matches the name in the selectedAreas array
  React.useEffect(() => {
    const selectedAreaObjects = selectedAreas.map((selectedArea) => {
        // Find the corresponding area object in the areas array
        return allAreas.find((area) => area.name === selectedArea); // Non-null assertion operator
    });

    setSelectedAreasItems(selectedAreaObjects);
  }, [selectedAreas]);

  // Use the callback function onChange to pass up the selectedAreasItems to the parent
  // every time the selectedAreasItems updates
  React.useEffect(() => {
    onChange(selectedAreasItems);
  }, [selectedAreasItems]);

  return (
    <div>
        <FormControl
          sx={{
              m: 1,
              width: "100%",
              "& .Mui-focused .MuiInputLabel-root": {
                  color: defaultColor.default,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: defaultColor.default,
              },
          }}
        >
        <InputLabel
        sx={{
          "&.Mui-focused": {
            color: defaultColor.default,
          },
        }}
        id="demo-multiple-chip-label"
        >
          Choose Your Area...
        </InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedAreas}
          onChange={handleChange}
          input={
              <OutlinedInput
                  id="select-multiple-chip"
                  label="Choose your area..."
                  sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: defaultColor.default,
                      },
                  }}
              />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredAreas.map((area) => (
              <MenuItem
                  key={area.id}
                  value={area.name}
                  style={getStyles(area.name, selectedAreas, theme)}
              >
                  <FontAwesomeIcon
                      className="text-red-500"
                      icon={area.icon}
                      style={{ marginRight: 8 }}
                  />
                  {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
