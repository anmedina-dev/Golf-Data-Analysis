#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Import Necessary Modules
import pandas as pd
import numpy as np


# In[2]:


df = pd.read_csv('golf_scoring_stats.csv', encoding = "ISO-8859-1", low_memory = False)
df.head()


# In[3]:


df.info()


# In[ ]:


df = df.drop(['Rank Last Week'], axis=1)


# In[4]:


df = df.dropna(subset=['Rank This Week', 'Rounds', 'Average', 'Total Strokes', 'Total Adjustment'])


# In[5]:


df.info()


# In[6]:


df.tail()



# In[8]:


df['Rank This Week'] = df['Rank This Week'].replace(regex=['T'], value='')


# In[9]:


df.head(15)


# In[10]:


df.dtypes


# In[11]:


df['Rank This Week'] = df['Rank This Week'].astype('float')
df['Rank This Week'] = df['Rank This Week'].astype('Int64')


# In[13]:


df['Total Strokes'] = df['Total Strokes'].replace(regex=[','], value='')


# In[14]:


df['Total Strokes'] = df['Total Strokes'].astype(int)
df['Total Strokes'] = df['Total Strokes'].astype('Int64')


# In[15]:


df['Total Adjustment'] = df['Total Adjustment'].replace(regex=[' '], value='')


# In[16]:


df['Total Adjustment'] = df['Total Adjustment'].astype('float64')


# In[17]:


df.dtypes


# In[ ]:


df.to_csv('clean_golf_scoring_data.csv')
