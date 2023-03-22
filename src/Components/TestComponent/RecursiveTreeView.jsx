import React, { useState } from "react";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";

/* array data starts */
const data = [
  {
    id: "0",
    name: "Parent",
    children: [
      {
        id: "ch-1-01",
        name: "Child - 1",
      },
      {
        id: "ch-1-02",
        name: "Child - 3",
        children: [
          {
            id: "4",
            name: "Child - 4",
            children: [
              {
                id: "7",
                name: "Child - 7",
              },
              {
                id: "8",
                name: "Child - 8",
              },
            ],
          },
        ],
      },
      {
        id: "ch-1-03",
        name: "Child - 5",
        children: [
          {
            id: "6",
            name: "Child - 6",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    name: "Parent",
    children: [
      {
        id: "ch-2-01",
        name: "Child - 1",
      },
      {
        id: "ch-2-02",
        name: "Child - 3",
        children: [
          {
            id: "4ss",
            name: "Child - 4",
            children: [
              {
                id: "734s",
                name: "Child - 7",
              },
              {
                id: "847f",
                name: "Child - 8",
              },
            ],
          },
        ],
      },
      {
        id: "ch-2-03",
        name: "Child - 5",
        children: [
          {
            id: "612ss",
            name: "Child - 6",
          },
        ],
      },
    ],
  },
];
/* array data ends */

const RecursiveTreeView = () => {
  const [selected, setSelected] = useState([]);

  function getChildById(node, id) {
    let array = [];

    function getAllChild(nodes) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes, id) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked, nodes) {
    const allNode = getChildById(data, nodes.id);

    let array = checked
      ? [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    // If the current node has children, update the selected state for all child nodes as well
    if (Array.isArray(nodes.children)) {
      nodes.children.forEach((child) => {
        const childNodeIds = getChildById(data, child.id);
        array = checked
          ? [...array, ...childNodeIds]
          : array.filter((value) => !childNodeIds.includes(value));
      });
    }

    setSelected(array);
  }

  console.log("selected:", selected);

  const RenderTreeWithCheckboxes = (nodes) => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
              />
            }
            label={<>{nodes.name}</>}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => RenderTreeWithCheckboxes(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <>
      {data.map((value) => (
        <TreeView
          key={value.id}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {RenderTreeWithCheckboxes(value)}
        </TreeView>
      ))}
    </>
  );
};

export default RecursiveTreeView;
