import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { MainContext } from "../reactContext";
import { IDataRow } from "../types/main";

const DataEditor = () => {
    const { editMarker, setEditMarker } = useContext(MainContext);
    
    const addData = () => {
        if(editMarker) {
            setEditMarker({ ...editMarker, data: [...editMarker.data, {id: 0, name:"", type: "String", value: ""}]})
        }
    }

    const removeData = (data : IDataRow) => {
        if(editMarker) {
            setEditMarker({ ...editMarker, data: editMarker.data.filter(x => x !== data)});
        }
    }

    const editData = (data: IDataRow, event: any, field: string) => {
        if(editMarker) {
            let newData = { ...data };
            
            if(field === "name") newData.name = event.target.value;
            if(field === "type") newData.type = event.target.value;
            if(field === "value") newData.value = event.target.value;

            setEditMarker({ ...editMarker, data: editMarker.data.map(x => {
                if(data === x) {
                    return newData;
                }
                return x;
            })})
        }
    }

    return (
        <div className="overflow-scroll-y h-full">
            <h3 className="text-2xl font-bold font-normal leading-normal text-blueGray-800 mb-2">DataEditor</h3>
            <table className="border-collapse w-full border border-emerald-800 rounded">
                <thead>
                    <tr>
                        <th className="w-1/6 border border-emerald-800">Name</th>
                        <th className="w-1/6 border border-emerald-800">DataType</th>
                        <th className="w-4/6 border border-emerald-800">Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        editMarker && editMarker.data.map((data, index) => {
                            return (
                                <tr className="hover:bg-gray-300">
                                    <td className="border border-emerald-800 text-center">
                                        <input className="w-full text-center bg-transparent" value={ data.name } onChange={(e) => editData(data, e, "name") } />
                                    </td>
                                    <td className="border border-emerald-800 text-center">
                                        <select className="w-full bg-transparent" onChange={(e) => editData(data, e, "type") }>
                                            <option selected={data.type === "String"}>String</option>
                                            <option selected={data.type === "Number"}>Number</option>
                                            <option selected={data.type === "Array"}>Array</option>
                                            <option selected={data.type === "Object"}>Object</option>
                                        </select>
                                    </td>
                                    <td className="border border-emerald-800 text-center">
                                        <input type={ data.type === "String" ? "text" : "number" } className="text-center w-full bg-transparent" value={ data.value } 
                                        onChange={(e) => editData(data, e, "value") } />
                                    </td>
                                    <td className="border text-red-600 border-emerald-800 text-center px-2">
                                        <FontAwesomeIcon className="cursor-pointer" onClick={() => removeData(data)} icon={faMinusCircle}></FontAwesomeIcon>
                                    </td>
                            </tr>
                            )
                        })
                    }
                    <tr className="cursor-pointer hover:bg-gray-300" onClick={addData}>
                        <td className="border border-emerald-800 text-center text-center">
                            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                        </td>
                        <td className="border border-emerald-800 text-center">...</td>
                        <td className="border border-emerald-800 text-center">...</td>
                        <td className="border border-emerald-800 text-center"></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default DataEditor;