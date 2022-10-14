import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ImageUploading, { ImageListType } from 'react-images-uploading';
const ProductUpload = () => {
  interface Options {
    value: string;
    label: string;
  }
  interface Division {
    _id: string;
    name: string;
  }
  interface District {
    _id: string;
    district: string;
  }

  interface Upazilla {
    _id: string;
    district: string;
  }

  interface District2 {
    _id: string;
    district: string;
    coordinates: string;
    upazilla: string[];
  }

  interface Property {
    propertyName: string;
    propertyValue: string;
    propertyID: number;
  }
  const fistProperty : Property[] = [{
    propertyName: '',
    propertyValue: '',
    propertyID: 0,
  }];

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [divisionOptions, setDivisionOptions] = useState([] as Options[]);
  const [productDivision, setProductDivision] = useState('');
  const [districtOptions, setDistrictOptions] = useState([] as Options[]);
  const [upazillaOptions, setUpazillaOptions] = useState([] as Options[]);
  const [productDistrict, setProductDistrict] = useState('');
  const [productUpazilla, setProductUpazilla] = useState('');
  const [formFields, setFormFields] = useState(fistProperty);
  const [policy, setPolicy] = useState('');
  const [productPicUpload, setProductPicUpload] = useState([] as File[]);
	const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  const handleSubmit = async () => {
    if (/* decodeduser != null */ true) {
      // const userID = decodeduser.id;
      // console.log("lol" + restaurantID);
      const newProduct = {
        productName,
        productDescription,
        productDivision,
        productDistrict,
        productUpazilla,
        formFields,
        policy,
        images,
      };
      console.log(newProduct);
    }
  };
  async function getDivisionOptions() {
    const { data } = await axios.get(
      `https://bdapis.herokuapp.com/api/v1.1/divisions`
    );
    console.log(data);
    if (data.status.message === 'ok') {
      const divisions = data.data.map((division: Division) => ({
        // eslint-disable-next-line no-underscore-dangle
        value: division._id,
        label: division.name,
      }));
      setDivisionOptions(divisions);
      console.log(`ere ${divisionOptions}`);
    } else {
      console.log('Division fetching api failed');
    }
  }
  useEffect(() => {
    getDivisionOptions();
  }, []);
  async function getDistrictOptions(value: string) {
    const { data } = await axios.get(
      `https://bdapis.herokuapp.com/api/v1.1/division/${value}`
    );
    console.log(data);
    if (data.status.message === 'ok') {
      const districts = data.data.map((district: District) => ({
        // eslint-disable-next-line no-underscore-dangle
        value: district._id,
        label: district.district,
      }));
      setDistrictOptions(districts);
    } else {
      console.log('District fetching api failed');
    }
  }

  async function getUpazillaOptions(value: string) {
    console.log(value);
    const { data } = await axios.get(
      `https://bdapis.herokuapp.com/api/v1.1/division/${value}`
    );
    console.log(data);

    if (data.status.message === 'ok') {
      const upazillas = data.data.filter(
        (upazilla: Upazilla) => upazilla.district === productDistrict
      );
      console.log(upazillas.upazilla);
      setUpazillaOptions(upazillas.upazilla);
    } else {
      console.log('District fetching api failed');
    }
  }

  async function getUpazillaOptions2(value: string) {
    console.log(value);
    const { data } = await axios.get(
      `https://bdapis.herokuapp.com/api/v1.1/division/${value}`
    );
    console.log(data);
    let tempStringArray: string[] = [];
    const temp2: Options[] = [];
    if (data.status.message === 'ok') {
      console.log(data.data);
      data.data.forEach((e: District2) => {
        console.log(productDistrict);
        console.log(e.district);
        // console.log(e.upazilla);
        if (e.district.toUpperCase == productDistrict.toUpperCase) {
          console.log(e.upazilla);
          tempStringArray = e.upazilla;
        }
      });
      console.log(tempStringArray);
      tempStringArray.forEach((e) => {
        temp2.push({ value: e, label: e });
      });
      setUpazillaOptions(temp2);
      console.log(temp2);
    }
  }
  const addFields = () => {
    setFormFields([...formFields, { propertyName: '', propertyValue: '', propertyID: formFields.length }]);
  };
  const fileHandler = (e: any) => {
    console.log(e.target.files);
    setProductPicUpload(e.target.files);
    console.log("productpic" + productPicUpload);
  };
  return (
    <>
      <h1>Product Upload</h1>
      <label htmlFor="name">
        Product Name
        <input id="productName" type="text" onChange={(e) => setProductName(e.target.value)} />
      </label>
      <label htmlFor="productDescription">
        Product Description
        <input id="productDescription" type="text" onChange={(e) => setProductDescription(e.target.value)} />
      </label>
      <label htmlFor="productPicUpload">
        Product Picture
				<div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
      </label>
      <label>
        Division
        <Select
          id="locationDivision"
          options={divisionOptions}
          defaultValue={{
            value: '',
            label: 'Select an option',
          }}
          onChange={(e) => {
            if (e != null) {
              setProductDivision(e.value);
              getDistrictOptions(e.value);
            }
          }}
          name="subjects"
        />
      </label>
      <label>
        District
        <Select
          options={districtOptions}
          defaultValue={{
            value: '',
            label: 'Select an option',
          }}
          onChange={(e) => {
            if (e != null) {
              setProductDistrict(e.value);
            }
          }}
          name="subjects"
        />
      </label>
      <label>
        Upazilla
        <Select
          options={upazillaOptions}
          defaultValue={{
            value: '',
            label: 'Select an option',
          }}
          onFocus={() => {
            getUpazillaOptions2(productDivision);
          }}
          onChange={(e) => {
            if (e) {
              console.log(productDistrict);
              getUpazillaOptions(productDistrict);
              setProductUpazilla(e.value);
            }
          }}
          name="subjects"
        />
      </label>
      <div>
        {
          formFields.map((element) => (
            <div key={element.propertyID}>
              <input
                type="text"
                placeholder="Property Name"
// eslint-disable-next-line no-return-assign
                onChange={(e) => formFields[element.propertyID].propertyName = e.target.value}
              />
              <input
                type="text"
                placeholder="Property Value"
// eslint-disable-next-line no-return-assign
                onChange={(e) => formFields[element.propertyID].propertyValue = e.target.value}
              />
              <button type="button" onClick={addFields}> Add Fields </button>
            </div>

          ))
       }
      </div>
      <label>
        Product Policy
        <h6>
          Policy is used to make your products safe. Say how you want the renters to use and
          care of your products. You can also mention the rules and regulations of the use of your products.
          These policies will also be used to give you an
          edge in taking legal actions if some rare incidents occurs
        </h6>
        <input id="productPolicy" type="text" onChange={(e) => setPolicy(e.target.value)} />
      </label>
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </>
  );
};
export { ProductUpload };
