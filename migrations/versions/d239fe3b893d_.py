"""empty message

Revision ID: d239fe3b893d
Revises: 21f5fdcc603d
Create Date: 2023-03-12 13:32:55.489327

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd239fe3b893d'
down_revision = '21f5fdcc603d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('region', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['user_region_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('region', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
