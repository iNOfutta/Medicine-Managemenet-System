import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";
import Image from "next/image";
import easyToManage from "../Images/easyToManage.webp";
import userFriendly from "../Images/userFriendly.webp";
import alwaysImproving from "../Images/alwaysImproving.webp";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Head>
        <title>SHRL - Gerenciamento Simplificado</title>
        <meta
          name="description"
          content="Plataforma intuitiva para o gerenciamento eficiente do seu estoque."
        />
      </Head>
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Bem-vindo ao Sistema de Gestão do HRL
          </Typography>
          <Typography variant="h6" component="p" paragraph textAlign="center">
            Gerencie seu estoque com facilidade e eficiência.
          </Typography>
          <Box textAlign="center" my={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setShowMore(!showMore)}
              sx={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Saber mais
            </Button>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                <Image
                  //src={easyToManage}
                  src={
                    "https://centerforuspolicy.org/wp-content/uploads/2019/03/AdobeStock_207692827EDIT.jpg"
                  }
                  alt="Gestão Eficiente"
                  width={500}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h6" component="p" mt={2}>
                  Gestão Eficiente
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                <Image
                  //src={userFriendly}
                  src={
                    "https://www.pcbennett.com/wp-content/uploads/2023/06/ERP-Header.png"
                  }
                  alt="Usabilidade Amigável"
                  width={500}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h6" component="p" mt={2}>
                  Usabilidade Amigável
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                <Image
                  //src={alwaysImproving}
                  src={
                    "https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_social_media/public/cgov_image/media_image/2021-01/Global-Research-iStock-1154231467.jpg"
                  }
                  alt="Inovação Contínua"
                  width={500}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h6" component="p" mt={2}>
                  Inovação Contínua
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {showMore && (
            <Box mt={6}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                textAlign="center"
              >
                Por que escolher o MedAssist?
              </Typography>
              <Box
                component="ul"
                sx={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}
              >
                <Typography component="li" paragraph>
                  <strong>Gestão Intuitiva:</strong> Interface fácil de usar
                  para todos os usuários.
                </Typography>
                <Typography component="li" paragraph>
                  <strong>Segurança:</strong> Proteção dos dados sensíveis com
                  criptografia avançada.
                </Typography>
                <Typography component="li" paragraph>
                  <strong>Personalização:</strong> Configurações adaptáveis às
                  necessidades específicas do seu negócio.
                </Typography>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
