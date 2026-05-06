import pandas as pd
import streamlit as st
import seaborn as sn
from matplotlib import pyplot as plt

@st.cache_data # Cache the data loading function to improve performance It is a python decorator
def load_data():
    return sn.load_dataset("penguins")

df = load_data()

st.write("# Penguins")
tab1, tab2, tab3, tab4 = st.tabs(["Data", "Bar Plot", "Scatter Plot", "Histogram"])
with tab1:
    st.write(df.head(5))
with tab2:
    # Create a bar plot of the species counts
    fig = plt.figure()
    df["species"].value_counts().plot(kind="bar")
    st.pyplot(fig)

    st.write(df["species"].value_counts())

with tab3:
    # create a scatter plot of bill length vs bill depth, colored by species
    fig = plt.figure()
    sn.scatterplot(data=df, x="bill_length_mm", y="bill_depth_mm", hue="species")
    st.pyplot(fig)

with tab4:
    # create a histogram
    Option =  ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
    column = st.selectbox("Select a column to plot", options=Option)
    fig = plt.figure()
    sn.histplot(data=df, x=column, kde=True)
    st.pyplot(fig)

st.write("# Hello world")
st.write("""
## Todo
# - [ ] Show a table
# - [ ] Show 1-2 plots
# - [ ] Add a control panel
# - [ ] create nice tabs         
         
""")