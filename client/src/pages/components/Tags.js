import React from "react";
import { Chip, ListItem } from "@material-ui/core";

function Tag(props) {
    var tagList = props.tags;

    // const [chipData, setChipData] = React.useState(tagList);

    // const handleDelete = (chipToDelete) => () => {
    //     setChipData((chips) =>
    //         chips.filter((chip) => chip._id !== chipToDelete._id)
    //     );
    //     tagList = chipData;

    //     // tagList = tagList.filter((data) => data._id !== chipToDelete._id);
    //     tagList = props.inTable ? tagList.slice(0, 5) : tagList;
    //     // axios post with contact id and tag id to delete from database
    // };
    // take first 5 elements only if displaying tags in table
    tagList = props.inTable ? tagList.slice(0, 5) : tagList;

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
                            variant="outlined"
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
