import React from "react";
import { TextField, Button, Typography, Link, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Login.scss'

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };


  return (
    <div className='login-page' style={{display:'flex', alignItems:'center', verticalAlign:'center', height:'100vh', background:'var(--secondary-color)', color:'var(--base-text-color)'}}> 
    <Container component="main" maxWidth="xs">
      <div style={{boxShadow:'var(--box-shadow)', padding:'25px', height:'50vh', justifyContent:'space-evenly', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div style={{marginTop:'-50px'}}>
      <div className="logo">
      </div>
    </div>
        <form style={{marginTop:'-50px', color:'var(--base-text-color)'}}>
          <TextField
            background = 'var(--primary-color)'
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            InputProps={{
              style: { boxShadow:'var(--box-shadow)',border:"0px",color:'var(--base-text-color)', backgroundColor: 'rgb(255,255,255,0.01)',  },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            InputProps={{
              style: { boxShadow:'var(--box-shadow)',color:'var(--base-text-color)', backgroundColor: 'rgb(255,255,255,0.01)',  },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
};

export default Login;
