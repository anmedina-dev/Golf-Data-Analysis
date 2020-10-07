#!/usr/bin/env python
# coding: utf-8

# In[42]:


#Import Necessary Modules
import pandas as pd
import numpy as np


# In[43]:


df = pd.read_csv('golf_scoring_stats.csv', encoding = "ISO-8859-1", low_memory = False)
df.head()


# In[44]:


df.info()


# In[45]:


df = df.dropna()


# In[46]:


df.info()


# In[47]:


df.tail()


# In[48]:


df['Rank Last Week'] = df['Rank Last Week'].replace(regex=['T'], value='')


# In[49]:


df['Rank This Week'] = df['Rank This Week'].replace(regex=['T'], value='')


# In[50]:


df.head(15)


# In[51]:


df.dtypes


# In[52]:


df['Rank This Week'] = df['Rank This Week'].astype('float')
df['Rank This Week'] = df['Rank This Week'].astype('Int64')


# In[53]:


df['Rank Last Week'] = df['Rank Last Week'].astype('float')
df['Rank Last Week'] = df['Rank Last Week'].astype('Int64')


# In[54]:


df['Total Strokes'] = df['Total Strokes'].replace(regex=[','], value='')


# In[55]:


df['Total Strokes'] = df['Total Strokes'].astype(int)
df['Total Strokes'] = df['Total Strokes'].astype('Int64')


# In[56]:


df['Total Adjustment'] = df['Total Adjustment'].replace(regex=[' '], value='')


# In[57]:


df['Total Adjustment'] = df['Total Adjustment'].astype('float64')


# In[58]:


df.dtypes


# In[59]:


df.to_csv('clean_golf_scoring_data.csv')


# In[ ]:




