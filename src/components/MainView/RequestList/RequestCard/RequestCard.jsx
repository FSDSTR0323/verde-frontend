import React, { useContext } from 'react';
import { Button, Grid, Typography, Checkbox, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider, Avatar, Chip, AlertTitle, Tooltip, IconButton } from '@mui/material';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Contexts/AuthContext';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { PhoneNumber } from '../../Contact/PhoneNumber';
import { WhatsAppButton } from '../../Contact/WhatsappButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { updateRequest } from '../../../apiService/apiService'


export function RequestCard({ user, title, showRealEstateLogo, type, transaction, country, province, municipality, population, neighborhood,
  minM2, maxM2, currency, minPrice, maxPrice, floorLevel,
  facing, propertyAge, rooms, baths, garages, condition, furnished, kitchenEquipment,
  closets, airConditioned, heating, elevator, outsideView, garden, pool, terrace, storage,
  accessible, _id }) {

  const { t } = useTranslation();
  const navigate = useNavigate()
  const showThumbsValue = false;
  const { profile } = useContext(AuthContext);



  const booleanItems = [
    airConditioned && { label: 'Aire acondicionado', value: airConditioned },
    heating && { label: 'Calefacción', value: heating },
    elevator && { label: 'Ascensor', value: elevator },
    storage && { label: 'Trastero', value: storage },
    outsideView && { label: 'Vista Exterior', value: outsideView },
    garden && { label: 'Jardín', value: garden },
    pool && { label: 'Piscina', value: pool },
    terrace && { label: 'Terraza', value: terrace },
    closets && { label: 'Closets', value: closets },
    accessible && { label: 'Accesible', value: accessible },
  ];

  const halfLength = Math.ceil(booleanItems.length / 2);
  const firstHalf = booleanItems.slice(0, halfLength);
  const secondHalf = booleanItems.slice(halfLength);


  let currencySymbol = '';
  if (currency === 'USD') {
    currencySymbol = '$';
  } else if (currency === 'EUR') {
    currencySymbol = '€';
  }

  // LE DAMOS FORMATO AL PRECIO
  // LE damos formato al precio minimo y al precio maximo
  const formattedMinPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(minPrice)
    .replace('.', ' ')
    .replace(',', ',');
  const formattedMaxPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(maxPrice)
    .replace('.', ' ')
    .replace(',', ',');

  // LE DAMOS FORMATO A LA UBICACIÓN

  const removeTextInParentheses = (text) => {
    return text.replace(/\([^()]*\)/g, "").trim()
  };
  


  const locationText = [
    province.PRO,
    municipality.DMUN50,
    population.NENTSI50,
    neighborhood.NNUCLE50
  ]
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(removeTextInParentheses)
    .join(", ")

    const handleDeleteRequest = async (_id, status) => {
      updateRequest(_id, { status: "DELETED" });
        navigate("/");
        alert("Requerimiento eliminado correctamente")
    }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 3,
        display: 'flex',
        padding: 0,
        margin: '-5px 15px 20px -20px',
        height: 'auto',
      }}
    >

      <span style={{ flex: '1 0 40%', marginLeft: '10px', marginRight: '10px', padding: 0 }}>
        {/* LEFT */}
        <span style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* TOP, LEFT */}
          <Card style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', margin: '0px 0px 8px 0px' }}>
            <div style={{ display: 'inline-flex', padding: '25px', margin: '10px 10px 8px 5px' }}>
              {
                <>
                  <Chip label={t(`transaction.${transaction}`, { ns: "housing" })} color="primary" variant="contained" size="small" style={{ marginRight: '15px' }} />
                  <Chip label={t(`type.${type}`, { ns: "housing" })} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />
                  {furnished && <Chip label={t(`furnished.${furnished}`, { ns: "housing" })} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />}
                </>
              }
           </div>
            <div>
              <h3 style={{ margin: '5px 5px 5px 5px', marginBottom: '5px', flexGrow: 1 }}>{title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', padding: '25px', flexGrow: 1 }}>
                <LocationOnOutlinedIcon style={{ marginRight: '10px' }} />
                <h6 style={{ margin: '0px' }}>{locationText}</h6>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', padding: '25px', marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FullscreenOutlinedIcon style={{ marginRight: '10px' }} />
                <h5>Min {minM2} m2</h5>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FullscreenOutlinedIcon style={{ marginRight: '10px' }} />
                <h5>Max {maxM2} m2</h5>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BedOutlinedIcon style={{ marginRight: '10px' }} />
                <h5>{rooms}</h5>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {baths ?
                  <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <BathtubIcon style={{ marginRight: '10px' }} />
                    <h5 style={{ margin: '0px' }}>{baths}</h5>
                  </div> :
                  <div></div>
                }
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {garages ?
                  <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <DirectionsCarIcon style={{ marginRight: '10px' }} />
                    <h5 style={{ margin: '0px' }}>{garages}</h5>
                  </div> :
                  <div></div>
                }</div>
            </div>
          </Card>


          {/* BOTTOM, LEFT */}
          <Card style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '0px', marginLeft: '5px', padding: "4px" }}>
              <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                <div>Precio Minimo: {minPrice} {currencySymbol} </div>
                <div>Precio Máximo: {maxPrice} {currencySymbol} </div>
                <div style={{ display: 'flex' }}>
                {
                    user._id === profile._id &&
                  <>
                    <EditIcon style={{ cursor: 'pointer' }} onClick={() => navigate(`/housingdetails/${_id}`)} />
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={handleDeleteRequest} />
                  </>
                }

                </div>
              </h4>
            </div>
          </Card>
        </span>
      </span>
      <span style={{ flex: '1 0 29%' }}>
        {/* CENTER SIDE */}
        <Card style={{ height: '100%' }}>
          {/* TEXT ESPECIFICATIONS */}

          <div style={{ padding: "8px 8px 8px 8px" }}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                {floorLevel && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nivel de piso:</Typography>
                )}
                {facing && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Orientación:</Typography>
                )}
                {propertyAge && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Antigüedad del inmueble:</Typography>
                )}
                {condition && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Condición:</Typography>
                )}
                {furnished && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Amueblado:</Typography>
                )}
                {kitchenEquipment && (
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Equipamiento de cocina:</Typography>
                )}
              </Grid>
              <Grid item xs={5}>
                {floorLevel && <Typography variant="subtitle1">{t(`floorLevel.${floorLevel}`, { ns: "housing" })}</Typography>}
                {facing && <Typography variant="subtitle1">{t(`facing.${facing}`, { ns: "housing" })}</Typography>}
                {propertyAge && <Typography variant="subtitle1">{t(`propertyAge.${propertyAge}`, { ns: "housing" })}</Typography>}
                {condition && <Typography variant="subtitle1">{t(`condition.${condition}`, { ns: "housing" })}</Typography>}
                {furnished && <Typography variant="subtitle1">{t(`furnished.${furnished}`, { ns: "housing" })}</Typography>}
                {kitchenEquipment && <Typography variant="subtitle1">{t(`kitchenEquipment.${kitchenEquipment}`, { ns: "housing" })}</Typography>}
              </Grid>
            </Grid>
          </div>

          <Divider style={{ margin: "10px" }} />

          {/* BOOLEAN ESPECIFICATIONS */}
          <Grid container spacing={0}>
            {booleanItems.map((item, index) => (
              item && (
                <Grid item xs={6} key={index}>
                  <Typography>
                    <Checkbox checked={true} />
                    {item.label && <span>{item.label}</span>} {item.value && <span>{item.value}</span>}
                  </Typography>
                </Grid>
              )
            ))}
          </Grid>
        </Card>
      </span>
      <span>
        {/* RIGHT */}
        <Card style={{ padding: "50% 3px 5px 3px", display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: "150px" }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            {user.realEstateLogo && showRealEstateLogo && user.profilePicture ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div><Avatar alt="profile picture" src={user.profilePicture} sx={{ width: 56, height: 56 }} /></div>
                <div><Avatar alt="real estate logo" src={user.realEstateLogo} sx={{ width: 75, height: 75 }} /></div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {user.profilePicture ? (
                  <div><Avatar alt="profile picture" src={user.profilePicture} sx={{ width: 56, height: 56 }} /></div>
                ) : (

                  <Avatar sx={{ width: 56, height: 56 }} />
                )}
              </div>
            )}
          </div>

          <div style={{ alignSelf: 'center', marginTop: '10px' }}>
            <h4 style={{ padding: '20px 0px 20px 0px ', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
              {user.name} {user.surname}
            </h4>
          </div>

          {user.agentRegistrationNumber && user.agentRegistrationCommunity &&
            <Tooltip title={`Registro No. ${profile.agentRegistrationNumber} C.A. de ${profile.agentRegistrationCommunity}`}>
              <IconButton
                size="small"
                style={{ marginBottom: '5px' }}
                color="success"
              >
                <CardMembershipIcon fontSize="medium" />
              </IconButton>
            </Tooltip>}



          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>

            {user.telephone1 &&
              <WhatsAppButton phoneNumber={user.telephone1} />}


            {user.telephone2 &&
              <PhoneNumber phoneNumber={user.telephone2} />}

            <Tooltip title={user.email} arrow>
              <IconButton
                component="a"
                href={`mailto:${user.email}`}
                size="small"
                style={{ marginBottom: '5px' }}
                color="primary"
              >
                <EmailOutlinedIcon fontSize="medium" />
              </IconButton>
            </Tooltip>

          </div>
        </Card>
      </span>
    </Box >
  )
}
