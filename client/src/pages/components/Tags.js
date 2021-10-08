import React from "react";
import { Chip, ListItem } from "@material-ui/core";
import { useGlobalState } from "state-pool";
// import { useGlobalState } from "state-pool";
function Tag(props) {
    const deletable = props.doDelete;
    var tagList = props.tags;

    const [info, setInfo] = useGlobalState("contactInfo");
    const [chipData, setChipData] = React.useState(tagList);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip._id !== chipToDelete._id)
        );
        tagList = chipData;
        // tagList = tagList.filter((data) => data._id !== chipToDelete._id);

        // axios post with contact id and tag id to delete from database
    };
    return (
        <div className="listTags">
            {tagList.map((data) => {
                return (
                    <ListItem
                        key={data._id}
                        style={{ padding: "2px", width: "auto" }}
                    >
                        <Chip
                            label={data.tagText}
                            style={{
                                backgroundColor: data.tagColour,
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                            // size="small"
                            // variant="outlined"
                            //onDelete={handleDelete(data)}
                        />
                    </ListItem>
                );
            })}
        </div>
    );
}

export default Tag;
